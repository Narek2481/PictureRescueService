export const initialValueCategory = {
    value:["All"]
};

export function valueCategoryReducer (state = {}, action) {
    if (action.type === "change_value") {
        return {
            value:action.pyload
        }
    }
    else {
        return state;
    }
}

export function selectValueCategory(state) {
    return state.value
}

export function editValueCategory(pyload) {
    return {
        type:"change_value",
        pyload : pyload
    }
}