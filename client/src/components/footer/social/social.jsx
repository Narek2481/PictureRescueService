import { memo } from "react"



const Social = memo(({props}) => {

    return (
        <li className="col-sm-3 col-6 mt-5 ">
            <a
                className="link-primary"
                href="#"
            >
                <img className="img-fluid icon_social" src={props.src} />
                <div>{props.text}</div>
            </a>
        </li>
    )
});

export default Social