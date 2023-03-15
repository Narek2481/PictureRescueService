import { memo, useCallback } from "react";

const Select_category = ({ props }) => {

    return (
        <div className="category_container">
            <label htmlFor="category">choose a category:</label>
            <select
                name="category"
                defaultValue={'All'}
                onChange={useCallback((e) => {

                    props.set_select_value(e.target.value);
                    props.set_nesting((state) => ++state);

                }, [])}
            >
                <option value={"All"}>All</option>
                {
                    props.elem.map((elem, i) => <option value={elem.value} key={i}>{elem.value}</option>)
                }
            </select>
        </div>
    )
};

export default memo(Select_category);