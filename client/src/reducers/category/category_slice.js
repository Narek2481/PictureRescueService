export  function category_search_reducer(state=null,action){
    if(action.type === "category_search_change"){
        return{
            ...state,
            category_search: action.pyload.category_search
        }
    }
    return state;
}

export const initial_category_search = {
    category: null
};