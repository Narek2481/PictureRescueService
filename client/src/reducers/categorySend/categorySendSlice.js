import { parentCategoryChange } from "../category/categorySlice";
import { imageCategoryGet, imageCategoryPost } from "./categorySendApi";


export function categorySendReducer(state = null, action) {
    if (action.type === "category_send_change") {
        return {
            ...state,
            category: action.pyload
        }
    }
    return state;
}

export const initialCategorySend = {
    category: null
};

export function editCategorySend(pyload) {
    return {
        type: "category_search_change",
        pyload: pyload
    }
}
export function downloudCategoryGet() {
    return (dispatch) => {
        return imageCategoryGet()
            .then((res) => {
                return dispatch(editCategorySend([...res.data[0]]));
            })
            .catch((e) => {
                return e;
            });
    }
}
export function downloudCategoryPost(pastData,value,categoryValue) {
    const pastDataIndex = categoryValue.indexOf("All");
    
    pastData = pastData.slice(0, pastDataIndex)
    return (dispatch) => {
        return (
            imageCategoryPost(value)
                .then((res) => {
                    console.log([...pastData, ...res.data], "post data ")
                    dispatch(editCategorySend([...pastData, ...res.data[0]]));
                })
                .catch((e) => {
                    return e;
                })
        );
    }
}
