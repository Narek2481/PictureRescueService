import { applyMiddleware, combineReducers, createStore } from "redux";
import { category_search_reducer, initial_category_search } from "../reducers/category/category_slice";
import { downlode_data_reducer, initial_downlode_data } from "../reducers/data/data_slice";
import { current_user_reducer, initial_current_user } from "../reducers/user/user_slice";
import thunk from "redux-thunk"



// create store
const store = createStore(combineReducers({
    current_user: current_user_reducer,
    downlode_data: downlode_data_reducer,
    category_search: category_search_reducer
}), {
    current_user: initial_current_user,
    downlode_data: initial_downlode_data,
    category_search: initial_category_search
}, applyMiddleware(thunk));

export default store;