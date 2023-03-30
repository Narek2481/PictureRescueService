export const initial_modal = {
    modal_data: {
        modal: false,
        modal_img: null
    },
};

export function current_modal_reduser(state = {}, action) {
    if (action.type === "current_modal_cgange") {
        return ({
            ...state,
            modal_data:action.pyload
        });
    }
    else {
        return state;
    }
}

export function edit_modal(pyload) {
    return {
        type: "current_modal_cgange",
        pyload: pyload
    }
}