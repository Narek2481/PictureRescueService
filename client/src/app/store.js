import { applyMiddleware, combineReducers, createStore } from "redux";
import { category_search_reducer, initial_category_search } from "../reducers/category/category_slice";
import { downlode_data_reducer, initial_downlode_data } from "../reducers/data/data_slice";
import { current_user_reducer, initial_current_user } from "../reducers/user/user_slice";
import thunk from "redux-thunk"
import { category_send_reducer, initial_category_send } from "../reducers/category_send/category_send_slice";
import { current_modal_reduser, initial_modal } from "../reducers/modal/modal_slice";



// create store
const store = createStore(combineReducers({
    current_user: current_user_reducer,
    downlode_data: downlode_data_reducer,
    category_search: category_search_reducer,
    category_send : category_send_reducer,
    modal:current_modal_reduser

}), {
    category_send:initial_category_send,
    current_user: initial_current_user,
    downlode_data: initial_downlode_data,
    category_search: initial_category_search,
    modal:initial_modal
}, applyMiddleware(thunk));

export default store;