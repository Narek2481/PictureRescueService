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
    return (dispatch, get_state) => {
        return imageCategoryGet()
            .then((res) => {
                return dispatch(editCategorySend([...res.data]));
            })
            .catch((e) => {
                return e;
            });
    }
}
export function downloudCategoryPost(past_data,value) {
    

    return (dispatch) => {
        return (
            imageCategoryPost(value)
                .then((res) => {
                    console.log([...past_data, ...res.data], "post data ")
                    dispatch(editCategorySend([...past_data, ...res.data]));
                })
                .catch((e) => {
                    return e;
                })
        );
    }
}
