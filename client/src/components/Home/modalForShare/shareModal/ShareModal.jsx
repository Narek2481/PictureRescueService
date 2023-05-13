import { memo, useMemo, useState } from "react"
import StickyInputLabel from "../../../sign_in/signInForm/StickyInputLabel/StickyInputLabel"


const ShareModal = ({props}) => {
    

    return (
        <div>
            <StickyInputLabel props={
                useMemo(() => {
                    return {
                        text: "UserEmail",
                        name: "Username",
                        type: "email",
                        inputValue: props.dataForSend,
                        setInputValue: props.setDataForSend,
                    }
                }, [props.dataForSend])}
            />
        </div>
    )
}

export default memo(ShareModal)