export const initialCurrentUser = {
    register_or_login: false,
    email: "",
    name: "",
    last_name: "",
    password: ""
};

export function currentUserReducer (state = {}, action) {
    if (action.type === "current_user_registration") {
        return  {
            ...state,
            ... action.pyload
        };
    }
    else {
        return state;
    }
}

export function selectCurrentUser(state) {
    return state.current_user
}

export function editCurrentUser(pyload) {
    return {
        type:"current_user_registration",
        pyload : pyload
    }
}