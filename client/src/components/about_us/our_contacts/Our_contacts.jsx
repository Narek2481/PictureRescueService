import facebook from "../../../img_logo/facebook (1).png"
import instagram from "../../../img_logo/instagram (1).png"
import gmail from "../../../img_logo/gmail.png"
import twitter from "../../../img_logo/twitter.png"

export default function Our_contacts() {
    const style = { hover: { color: "#007bff;" } }
    return (
        <>
            <div className="container mt-5">
                <div className="row ">
                    <div className="col-3">
                        <a
                            className="link-primary"
                            href="#"
                        >
                            <img className="icon_social" src={instagram}></img>
                            <div>Instagram</div>
                        </a>
                    </div>
                    <div className="col-3">

                        <a
                            className="link-primary"
                            href="#"
                        >
                            <img className="icon_social " src={twitter} />
                            <div>twitter</div>
                        </a>
                    </div>
                    <div className="col-3">
                        <a
                            className="link-primary"
                            href="#"
                        >
                            <img className="icon_social"  src={gmail} />
                            <div>Email</div>
                        </a>
                    </div>
                    <div className="col-3 mb-5">
                        <a
                            className="link-primary"
                            href="#"
                        >
                            <img className="img-fluid icon_social" src={facebook} />
                            <div>Facebook</div>
                        </a>
                    </div>
                </div>
            </div>
        </>
    );
}