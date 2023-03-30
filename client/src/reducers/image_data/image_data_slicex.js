export function image_data_reducer(state = {}, action) {
    if (action.type === "image_data_change") {
        return {
            ...state,
            image: action.pyload
        };
    } else {
        return state;
    }

}
export const initial_image_data = {
    image: ""
};
export function edit_image(pyload) {
    return {
        type: "image_data_change",
        pyload: pyload
    }
}