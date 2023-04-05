import { applyMiddleware, combineReducers, createStore } from "redux";
import { categorySearchReducer, initialCategorySearch } from "../reducers/category/categorySlice";
import { downlodeDataReducer, initialDownlodeData } from "../reducers/data/dataSlice";
import { currentUserReducer, initialCurrentUser } from "../reducers/user/userSlice";
import thunk from "redux-thunk"
import { categorySendReducer, initialCategorySend } from "../reducers/categorySend/categorySendSlice";
import { currentModalReduser, initialModal } from "../reducers/modal/modalSlice";



// create store
const store = createStore(combineReducers({
    currentUser: currentUserReducer,
    downlodeData: downlodeDataReducer,
    categorySearch: categorySearchReducer,
    categorySend : categorySendReducer,
    modal:currentModalReduser

}), {
    categorySend:initialCategorySend,
    currentUser: initialCurrentUser,
    downlodeData: initialDownlodeData,
    categorySearch: initialCategorySearch,
    modal:initialModal
}, applyMiddleware(thunk));

export default store;