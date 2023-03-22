import { loude_data } from "./data_api";

export function downlode_data_reducer(state = {}, action) {
    if (action.type === "downlode_data_change") {
        return {
            ...state,
            data: action.pyload
        };
    } else {
        return state;
    }

}
export const initial_downlode_data = {
    data: []
};
export function edit_data(pyload) {
    return {
        type: "downlode_data_change",
        pyload: pyload
    }
}
export function downloud_data(past_data) {
    return (dispatch, get_state) => {
        
        return (
            loude_data()
                .then((req) => {
                    dispatch(edit_data([...past_data, ...req.data]));
                })
        );
    }
}