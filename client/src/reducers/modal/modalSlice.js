export const initialModal = {
    modalData: {
        modal: false,
        modalImg: null
    },
};

export function currentModalReduser(state = {}, action) {
    if (action.type === "current_modal_cgange") {
        return ({
            ...state,
            modalData:action.pyload
        });
    }
    else {
        return state;
    }
}

export function editModal(pyload) {
    return {
        type: "current_modal_cgange",
        pyload: pyload
    }
}