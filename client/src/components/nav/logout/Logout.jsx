import React from 'react';
import { useDispatch } from 'react-redux';
import logout from '../../../action/logout';
import { editCurrentUser } from '../../../redux/user/userSlice';

const Logout = ({ props }) => {
    const dispatch = useDispatch();
    return (
        <li style={props.style} onClick={() => {
            logout()
            dispatch(editCurrentUser({ register_or_login: false }));
        }}>
            Logout
            <div className="line"></div>
        </li>
    );
};

export default Logout;