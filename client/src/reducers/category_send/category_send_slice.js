import { image_category_get, image_category_post } from "./category_send_api";


export function category_send_reducer(state = null, action) {
    if (action.type === "category_send_change") {
        return {
            ...state,
            category: action.pyload
        }
    }
    return state;
}

export const initial_category_send = {
    category: null
};

export function edit_category_send(pyload) {
    return {
        type: "category_search_change",
        pyload: pyload
    }
}
export function downloud_category_get() {
    return (dispatch, get_state) => {
        return image_category_get()
            .then((res) => {
                return dispatch(edit_category_send([...res.data]));
            })
            .catch((e) => {
                return e;
            });
    }
}
export function downloud_category_post(past_data,value) {
    console.log(past_data)
    return (dispatch, get_state) => {
        return (
            image_category_post(value)
                .then((res) => {
                    console.log([...past_data, ...res.data], "post data ")
                    dispatch(edit_category_send([...past_data, ...res.data]));
                })
                .catch((e) => {
                    return e;
                })
        );
    }
}
