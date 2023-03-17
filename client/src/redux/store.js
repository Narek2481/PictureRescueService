import { createStore } from "redux";



const store =  createStore((stete, action) => {
    if (action.type === "edit-current-user-name") {
        return {
            ...stete,
            current_user: {
                name: action.pyload.name
            }
        };
    }

    return stete;
}, {
    current_user: {
        name: "Narek"
    }
});

export default store;