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
export function downloudCategoryPost(past_data,value) {
    console.log(past_data)
    return (dispatch, get_state) => {
        return (
            imageCategoryPost(value)
                .then((res) => {
                    
                    console.log([...past_data, ...res.data], "post data ")
                    dispatch(editCategorySearch([...past_data, ...res.data]));

                })
                .catch((e) => {
                    return e;
                })
        );
    }
}
