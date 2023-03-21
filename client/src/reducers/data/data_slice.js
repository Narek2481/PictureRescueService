import  {loude_data}  from "./data_api";

export function downlode_data_reducer(state = [], action) {
    if (action.type === "downlode_data_change") {
        return {
            data: action.pyload.downloud_data.data
        }
    } else {
        return state;
    }

}
export const initial_downlode_data = {
    data: []
};
function edit_data(data) {
    return {
        type: "downlode_data_change",
        pyload: data
    }
}
export function downloud_data(past_data) {
    return (dispatch, get_state) => {
        return (
            loude_data(past_data)
                .then((data) => {
                    dispatch(edit_data(data));
                })
        );
    }
}