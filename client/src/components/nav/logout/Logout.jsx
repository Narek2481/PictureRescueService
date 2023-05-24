import React from 'react';
import logout from '../../../action/logout';
import { useDispatch } from 'react-redux';
import { editCurrentUser } from '../../../redux/user/userSlice';

const Logout = ({props}) => {
    const dispatch = useDispatch();
    return (
        <li style={props.style} onClick={()=>{
            logout()
            dispatch(editCurrentUser({ register_or_login: false }));
        }}>
            Logout
        </li>
    );
};

export default Logout;