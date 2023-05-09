import { loudeData } from "./dataApi";
import { editCurrentUser } from "../user/userSlice"
export function downlodeDataReducer(state = {}, action) {
    if (action.type === "downlode_data_change") {
        return {
            ...state,
            data: action.pyload
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
    fatching: true
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
                    console.log(res.data)
                    if (res.data) {
                        if (res.data[1] === "true") {
                            console.log(res.data[1])
                            localStorage.setItem("auth", JSON.stringify(res.data[1]));
                            // localStorage.setItem("name", JSON.stringify(res.data.name ? res.data.name : ""));
                            dispatch(editCurrentUser({
                                register_or_login: res.data[1] ? true : false,
                                name: ""
                            }));
                        }
                        dispatch(editData([...pastData, ...res.data[0]]));
                        return dispatch(fetchChange)
                    }
                    setFatchNull(true);
                    dispatch(fetchChange);
                })
        );
    }
}