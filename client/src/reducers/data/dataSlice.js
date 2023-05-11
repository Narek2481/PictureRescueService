import { loudeData } from "./dataApi";
import { editCurrentUser } from "../user/userSlice";
import { useSelector } from "react-redux";


export function downlodeDataReducer(state = {}, action) {
    
    if (action.type === "downlode_data_change") {
        const limit = state.limit+=9;
        return {
            ...state,
            data: action.pyload,
            limit:limit
        };
    } else if (action.type === "change_fetching") {
        return {
            ...state,
            fatching: action.pyload.fatching
        };
    } else if (action.type === "category_data") {
        return {
            data: action.pyload
        };
    }
    else {
        return state;
    }

}
export const initialDownlodeData = {
    data: [],
    fatching: true,
    limit :9
};
export function editDataCategory(pyload) {
    return {
        type: "category_data",
        pyload: pyload
    }
}
export function editData(pyload) {
    return {
        type: "downlode_data_change",
        pyload: pyload
    }
}
export function editFatching(pyload) {
    return {
        type: "change_fetching",
        pyload: pyload
    }
}
export function downloudData(pastData, offset, fetchChange, categoryValue, setFatchNull) {
    
    return (dispatch) => {
        return (
            loudeData(offset, categoryValue)
                .then((res) => {
                    if (res.data) { 
                        dispatch(editData([...pastData, ...res.data[0]]));
                        return dispatch(fetchChange)
                    }
                    setFatchNull(true);
                    dispatch(fetchChange);
                })
        );
    }
}