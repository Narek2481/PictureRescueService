import { memo } from "react"
import StickyInputLabel from "../../../sign_in/signInForm/StickyInputLabel/StickyInputLabel"


const ShareModal = ({ props }) => {


    return (
        <div>
            <StickyInputLabel props={
                {
                    text: "UserEmail",
                    name: "Username",
                    type: "email",
                    inputValue: props.dataForSend,
                    setInputValue: props.setDataForSend,
                }
            }
            />
        </div>
    )
}

export default memo(ShareModal)