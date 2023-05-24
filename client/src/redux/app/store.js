import { applyMiddleware, combineReducers, createStore } from "redux";
import { categorySearchReducer, initialCategorySearch } from "../category/categorySlice";
import { downlodeDataReducer, initialDownlodeData } from "../data/dataSlice";
import { currentUserReducer, initialCurrentUser } from "../user/userSlice";
import thunk from "redux-thunk"
import { categorySendReducer, initialCategorySend } from "../categorySend/categorySendSlice";
import { currentModalReduser, initialModal } from "../modal/modalSlice";
import { initialValueCategory, valueCategoryReducer } from "../valueCategory/valueCategorySlice";



// create store
const store = createStore(combineReducers({
    currentUser: currentUserReducer,
    downlodeData: downlodeDataReducer,
    categorySearch: categorySearchReducer,
    categorySend : categorySendReducer,
    modal:currentModalReduser,
    value:valueCategoryReducer
}), {
    categorySend:initialCategorySend,
    currentUser: initialCurrentUser,
    downlodeData: initialDownlodeData,
    categorySearch: initialCategorySearch,
    modal:initialModal,
    value:initialValueCategory
}, applyMiddleware(thunk));

export default store;