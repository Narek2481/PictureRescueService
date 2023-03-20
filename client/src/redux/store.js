import { createStore } from "redux";



const store = createStore((state, action) => {
    switch (action.type) {
        case 'current_user_change':
            return {
                ...state,
                current_user: {
                    name: action.pyload.register_or_login
                }
            };
        case 'downlode_data_change':
            return {
                ...state,
                current_user: {
                    name: action.pyload.downlode_data
                }
            };
        case 'category_search_change':
            return {
                ...state,
                current_user: {
                    name: action.pyload.category_search
                }
            };
        default:
            return state;
    }
}, {
    current_user: {
        register_or_login: false,

    },
    downlode_data: {
        data: []
    },
    category_search: {
        category: null
    }
});

export default store;