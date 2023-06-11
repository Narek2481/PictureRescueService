import { Link } from "react-router-dom";

const LinkComponent = ({ props }) => {
    return (
        <li style={props.style}>
            <Link to={props.path} onClick={props.click}>
                {props.text}
            </Link>
            <div className="line"></div>
        </li>
    )
};







export default LinkComponent;