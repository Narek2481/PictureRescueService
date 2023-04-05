import { Link } from "react-router-dom";

const LinkComponent = ({ props }) => {
    return (
        <li style={props.style}>
            <Link to={props.path} onClick={props.click}>
                {props.text}
            </Link>
        </li>
    )
};







export default LinkComponent;