import { editDataCategory } from "../data/dataSlice";
import { imageCategoryGet, imageCategoryPost } from "./categoryApi";


export function categorySearchReducer(state = null, action) {
    if (action.type === "category_search_change") {
        return {
            ...state,
            category: action.pyload
        }
    }else if(action.type === "categoryFetch"){
        return {
            ...state,
            fetchingCategory: action.pyload
        }
    }
    return state;
}

export const initialCategorySearch = {
    category: null,
    fetchingCategory:true
};

export function editCategorySearch(pyload) {
    return {
        type: "category_search_change",
        pyload: pyload
    }
}
export function editCategoryFetch(pyload) {
    return {
        type: "categoryFetch",
        pyload: pyload
    }
}
export function downloudCategoryGet() {

    return (dispatch) => {
        return imageCategoryGet()
            .then((res) => {
                
                return dispatch(editCategorySearch([...res.data[0]]));
            })
            .catch((e) => {
                return e;
            });
    }
}

export function parentCategoryChange(pastData, value) {
    let indexParent = false;

    pastData.forEach((element, i) => {
        console.log(element)
        if (element) {
            element.forEach(e => {
                if (e.name === value) {
                    indexParent = i
                }
            })
        }

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
        return (dispatch) => {
            dispatch(editCategorySearch([...pastData]))
        }
    } else {
        console.log(pastData)
        return (dispatch) => {
            return (
                imageCategoryPost(value, pastData)
                    .then((res) => {
                        dispatch(editDataCategory(res.data[1]))
                        console.log([...pastData, ...res.data], "post data ")
                        dispatch(editCategorySearch([...pastData, ...res.data[0]]));
                    })
                    .catch((e) => {
                        return e;
                    })
            );
        }
    }

}
