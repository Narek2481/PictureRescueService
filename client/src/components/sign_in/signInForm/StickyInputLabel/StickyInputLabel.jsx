import { memo, useState } from "react";
import invisible from "../../../../img_logo/invisible.png";
import visible from "../../../../img_logo/visible.png";

function StickyInputLabel({ props }) {
  const [inputType, setInputType] = useState(props.type);
  const changeInputType = e => {
    if (inputType === "password") {
      setInputType("text");
    } else {
      setInputType("password");
    }
  }
  return (
    <div className={"input-container mt-5 " + props.class}>
      <label htmlFor={props.name} className={props.inputValue ? 'sticky-label' : 'lable_position '}>{props.text}</label>
      <input
        id={props.name}
        type={inputType}
        value={props.inputValue}
        onChange={(e) => props.setInputValue(e.target.value)}
        style={props.style}
      />
        <img
          style={{ display: props.type !== "password" ? "none" : "inline-block" }}
          onClick={props.type === "password" ? changeInputType : ()=>{}}
          className="img-fluid eyeButton"
          src={inputType === "password" ? visible : invisible}
          alt="" />
    </div>
  );
}

export default memo(StickyInputLabel);