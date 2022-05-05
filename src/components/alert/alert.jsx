import React from 'react'
import '../alert/alert.scss';
import check from '../../assets/Frame 338.svg';

const Alert = ({ response, alert }) => {
    console.log(response)
    return (
        <div className="alert" style={{display: alert, transform : "translate(-10px)"}}>
            <div className="alert_wrapper">
                <img src={check} alt="" />
                <p>Assigned succcessfully</p>
            </div>
        </div>
    )
}

export default Alert
