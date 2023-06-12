import React from 'react';
import "./css/NotFound.scss"
const NotFound = () => {
    return (
        <div>
            <div className="cont_principal  cont_error_active">
                <div className="cont_error text-center ">
                    <h1>Oops</h1>
                    <p>The Page you're looking for isn't here.</p>
                </div>
                <div className="cont_aura_1"></div>
                <div className="cont_aura_2"></div>
            </div>
        </div>
    );
};

export default NotFound;