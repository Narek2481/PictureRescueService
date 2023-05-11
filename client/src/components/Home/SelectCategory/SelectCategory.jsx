import { memo, useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCategoryFetch } from "../../../reducers/category/categorySlice";

let defaultValue = [];

const SelectCategory = ({ props }) => {
    const dispatch = useDispatch()
    const fetchingCategory = useSelector(state => state.categorySearch.fetchingCategory);

    return (
        <div className="category_container container " >
            <label className="mb-4" htmlFor="category">Select a category to search</label>
            <select
                className="select_control form-control form-control-lg  text-center"
                name="category"
                defaultValue={defaultValue[props.index] ? defaultValue[props.index] : "All"}
                onChange={(e) => {
                    console.log(e.target.value)
                    defaultValue[props.index] = e.target.value
                    props.setSelectValue(e.target.value);
                    props.setNesting((state) => ++state);
                    dispatch(editCategoryFetch(!fetchingCategory));
                }}
            >
                <option value={"All"}>All</option>
                {
                    props.elem?.map((elem) => <option value={elem.name} key={elem.id}>{elem.name}</option>)
                }
            </select>
        </div>
    )
};

export default memo(SelectCategory);