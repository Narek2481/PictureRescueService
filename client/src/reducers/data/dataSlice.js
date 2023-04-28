import { loudeData } from "./dataApi";

export function downlodeDataReducer(state = {}, action) {
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
export const initialDownlodeData = {
    data: [],
    fatching:true
};
export function editData(pyload) {
    return {
        type: "downlode_data_change",
        pyload: pyload
    }
}
export function editFatching (pyload){
    return {
        type: "change_fetching",
        pyload: pyload
    }
}
export function downloudData(past_data,offset,fetch_change) {
    return (dispatch, get_state) => {
        
        return (
            loudeData(offset)
                .then((req) => {
                    console.log(req.data[1])
                    localStorage.removeItem("auth")
                    localStorage.setItem("auth",typeof req.data[1] === "object" ? false : req.data[1] )
                    dispatch(editData([...past_data, ...req.data[0]]));
                    dispatch(fetch_change)
                })
        );
    }
}