import instagram from "../../../img_logo/instagram.png"
import email from "../../../img_logo/email.png"
import Facebook from "../../../img_logo/twiter.png"
import twiter from "../../../img_logo/facebook.png"

export default function Our_contacts() {

    return (
        <div className="contacts">
            <div>
                <a href="#">
                    {/* <img src={instagram}></img> */}
                    Instagram
                </a>
            </div>
            <div>
                {/* <img src={twiter} /> */}
                <a href="#">Twiter</a>
            </div>
            <div>
                {/* <img src={email} /> */}
                <a href="#">Email</a>
            </div>
            <div>
                {/* <img src={Facebook} /> */}
                <a href="#">Facebook</a>
            </div>
        </div>
    );
}