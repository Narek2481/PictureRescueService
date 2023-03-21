

export const initial_current_user = {
    register_or_login: false,
    email: "",
    name: "",
    last_name: "",
    password: ""
};

export function current_user_reducer (state = {}, action) {
    
    if (action.type === "current_user_registration") {
        let payload = action.pyload
        console.log(payload , "peyload")
        return  payload;
    }
    else if (action.type === "current_user_login") {
        return {
            ...state,
            email: action.pyload.email,
            password: action.pyload.password,
        }

    } else {
        return state;
    }
}

export function select_current_user(state) {
    return state.current_user
}

export function edit_current_user(pyload) {
    return {
        type:"current_user_registration",
        pyload 
    }
}