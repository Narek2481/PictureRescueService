import { imageCategoryGet, imageCategoryPost } from "./categoryApi";


export function categorySearchReducer(state = null, action) {
    if (action.type === "category_search_change") {
        return {
            ...state,
            category: action.pyload
        }
    }
    return state;
}

export const initialCategorySearch = {
    category: null
};

export function editCategorySearch(pyload) {
    return {
        type: "category_search_change",
        pyload: pyload
    }
}
export function downloudCategoryGet() {

    return (dispatch, get_state) => {
        return imageCategoryGet()
            .then((res) => {
                return dispatch(editCategorySearch([...res.data]));
            })
            .catch((e) => {
                return e;
            });
    }
}

function parentCategoryChange(pastData, value) {
    let indexParent = false;
    pastData.forEach((element, i) => {
        element.forEach(e => {
            if (e.name === value) {
                indexParent = i
            }
        })
    });
    console.log(indexParent, "index")

    let newData = pastData.filter((data, index) => {
        return index <= indexParent;
    });

    console.log(newData, "new")
    return indexParent === false ? pastData : newData
}

export function downloudCategoryPost(pastData, value) {
    console.log(pastData)
    pastData = parentCategoryChange(pastData, value)
    if (value === "All") {
        return (dispatch, get_state) => {
            dispatch(editCategorySearch([...pastData]))
        }
    } else {
        console.log(pastData)
        return (dispatch, get_state) => {
            return (
                imageCategoryPost(value, pastData)
                    .then((res) => {
                        console.log([...pastData, ...res.data], "post data ")
                        dispatch(editCategorySearch([...pastData, ...res.data]));
                    })
                    .catch((e) => {
                        return e;
                    })
            );
        }
    }

}
