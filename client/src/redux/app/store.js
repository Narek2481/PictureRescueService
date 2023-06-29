import {  combineReducers } from "redux"
import { legacy_createStore as createStore, applyMiddleware } from 'redux'
import thunk from "redux-thunk"

import { categorySearchReducer, initialCategorySearch } from "../category/categorySlice";
import { downlodeDataReducer, initialDownlodeData } from "../data/dataSlice";
import { currentUserReducer, initialCurrentUser } from "../user/userSlice";
import { categorySendReducer, initialCategorySend } from "../categorySend/categorySendSlice";
import { currentModalReduser, initialModal } from "../modal/modalSlice";
import { initialValueCategory, valueCategoryReducer } from "../valueCategory/valueCategorySlice";
import { ProfileImageReducer, initialProfileImage } from "../imageProfile/imageProfile";



// create store
const store = createStore(combineReducers({
    ProfileImage:ProfileImageReducer,
    currentUser: currentUserReducer,
    downlodeData: downlodeDataReducer,
    categorySearch: categorySearchReducer,
    categorySend : categorySendReducer,
    modal:currentModalReduser,
    value:valueCategoryReducer
}), {
    ProfileImage:initialProfileImage,
    categorySend:initialCategorySend,
    currentUser: initialCurrentUser,
    downlodeData: initialDownlodeData,
    categorySearch: initialCategorySearch,
    modal:initialModal,
    value:initialValueCategory
}, applyMiddleware(thunk));

export default store;