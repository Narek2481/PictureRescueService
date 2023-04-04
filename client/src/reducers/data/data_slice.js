import { loude_data } from "./data_api";

export function downlode_data_reducer(state = {}, action) {
    if (action.type === "downlode_data_change") {
        return {
            ...state,
            data: action.pyload
        };
    } else if(action.type === "change_fetching"){
        return {
            ...state,
            fatching: action.pyload.fatching
        };
    }
    else {
        return state;
    }

}
export const initial_downlode_data = {
    data: [],
    fatching:true
};
export function edit_data(pyload) {
    return {
        type: "downlode_data_change",
        pyload: pyload
    }
}
export function edit_fatching (pyload){
    return {
        type: "change_fetching",
        pyload: pyload
    }
}
export function downloud_data(past_data,fetch_change) {
    return (dispatch, get_state) => {
        
        return (
            loude_data()
                .then((req) => {
                    
                    dispatch(edit_data([...past_data, ...req.data]));
                    dispatch(fetch_change)
                })
        );
    }
}