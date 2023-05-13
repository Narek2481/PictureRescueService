import { memo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCategoryFetch } from "../../../reducers/category/categorySlice";
import { editValueCategory, selectValueCategory } from "../../../reducers/valueCategory/valueCategorySlice";



const SelectCategory = ({ props }) => {
    const dispatch = useDispatch()
    const fetchingCategory = useSelector(state => state.categorySearch.fetchingCategory);
    const categoryValue = useSelector(selectValueCategory).value;
    console.log(categoryValue)
    return (
        <div className="category_container container " >
            <label className="mb-4" htmlFor="category">Select a category to search</label>
            <select
                className="select_control form-control form-control-lg  text-center"
                name="category"
                defaultValue={categoryValue[props.index] ? categoryValue[props.index] : "All"}
                onChange={(e) => {
                    console.log(e.target.value)
                    const newState = [];
                    for (let i = 0; i <= props.index; i++) {
                        if(i === props.index){
                            console.log(11)
                            newState.push(e.target.value);
                        }else{
                            console.log(22)
                            newState.push(categoryValue[i])
                        }
                    }
                    newState.push("All")
                    console.log(newState)
                    dispatch(editValueCategory(newState))
                    props.setSelectValue(e.target.value);
                    props.setNesting((state) => ++state);
                    dispatch(editCategoryFetch(!fetchingCategory));
                }}
            >
                <option value="All">All</option>
                {
                    props.elem?.map((elem) => <option value={elem.name} key={elem.id}>{elem.name}</option>)
                }
            </select>
        </div>
    )
};

export default memo(SelectCategory);