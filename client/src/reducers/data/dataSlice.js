import { loudeData } from "./dataApi";

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
                .then((req) => {
                    console.log(req.data)
                    if (req.data) {
                        console.log(req.data[1])
                        localStorage.removeItem("auth")
                        localStorage.setItem("auth", typeof req.data[1] === "object" ? false : req.data[1])
                        console.log()
                        dispatch(editData([...pastData, ...req.data[0]]));
                        return dispatch(fetchChange)
                    }
                    setFatchNull(true);
                    dispatch(fetchChange);

                })
        );
    }
}