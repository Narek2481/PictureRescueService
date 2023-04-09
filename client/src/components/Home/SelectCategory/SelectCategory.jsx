import { memo, useCallback } from "react";

const SelectCategory =  ({ props }) => {
    
    return (
        <div className="category_container container " >
            <label className="mb-4" htmlFor="category">Choose a category</label>
            <select
                className="select_control form-control form-control-lg  text-center"
                name="category"
                defaultValue={'All'}
                onChange={(e) => {
                        props.setSelectValue(e.target.value);
                        props.setNesting((state) => ++state);
                    }}
            >
                <option value={"All"}>All</option>
                {
                    props.elem.map((elem, i) => <option value={elem.value} key={i}>{elem.value}</option>)
                }
            </select>
        </div>
    )
};

export default memo(SelectCategory,() => true);