import {  editDataCategory, editFatching } from "../data/dataSlice";
import { imageCategoryGet, imageCategoryPost } from "../../action/categoryApi";


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
                dispatch(editFatching(true))
                return dispatch(editCategorySearch([...res.data[0]]));
            })
            .catch((e) => {
                return e;
            });
    }
}



export function downloudCategoryPost(pastData, value,categoryValue) {
    
    const pastDataIndex = categoryValue.indexOf("All");
    
    pastData = pastData.slice(0, pastDataIndex === 0 ? 1 :pastDataIndex )
    if (value === "All") {
        return (dispatch) => {
            dispatch(editFatching(true))
            dispatch(editCategorySearch([...pastData]))
        }
    } else {
        console.log(pastData)
        return (dispatch) => {
            return (
                imageCategoryPost(value, pastData)
                    .then((res) => {
                        console.log(res.data)
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
