import { Link } from "react-router-dom";

const Link_component = ({ props }) => {
    return (
        <li style={props.style}>
            <Link to={props.path}>
                {props.text}
            </Link>
        </li>
    )
};







export default Link_component;