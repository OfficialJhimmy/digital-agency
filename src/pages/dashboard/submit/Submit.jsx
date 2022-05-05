import React, { useState, useEffect } from 'react';
import '../../dashboard/dashboard.scss';
import '../../dashboard/createAds/createAds.scss';
import caretRight from '../../../assets/CaretRight.svg';
import ellipse2 from '../../../assets/Ellipse 28.svg';
import { Link } from 'react-router-dom';
import Loader from "react-loader-spinner";
import tick from '../../../assets/Frame 338.svg';

const Submit = ({showNext5, handleSubmit, disabled}) => {

    const [loading, setLoading] = useState(false);

    let btnText = ""
    if(loading === true){
        btnText = <div className="spier" style={{display : loading ? "block" : "none"}}>
        <Loader type="TailSpin" color="#ffffff" height={20} width={20} />
        </div>
    }else if(loading === false){
        btnText = <span>Save and Complete</span>
    }
    return (
            <div className="dashboard-main" style={{display : showNext5}}>
                <div className="pages-link">
                    <Link to='#'>Home</Link>
                    <img src={caretRight} alt="caret right"/>
                    <Link to='#'>Create an Ad</Link>
                </div>
                <div className="page-progress">
                    <div className="item first">
                        <img src={tick} alt="ellipse1" />
                        <p>Select a budget</p>
                    </div>
                    <div className="item">
                        <img src={tick} alt="ellipse1" />
                        <p>Ads details</p>
                    </div>
                    <div className="item">
                        <img src={tick} alt="ellipse1" />
                        <p>Pick a template</p>
                    </div>
                    <div className="item ">
                        <img src={tick} alt="ellipse 1" />
                        <p>Make payment</p>
                    </div>
                    <div className="item last">
                        <img src={ellipse2} alt="ellipse1" />
                        <p>Have a call</p>
                    </div>
                </div>
                <div className="call-card">
                    <div className="call-heading">
                        <h5>Submission</h5>
                    </div>
                    <div className="call-content">
                        <h3>Your payment is successful</h3>
                        <p>Proceed by clicking "save and complete" to save your ads. All ads can be viewed in ads history </p>
                        <div className="btns">
                            <button style={{backgroundColor : loading ? "#333333" : "#EE315D"}} disabled={disabled} onClick={handleSubmit} className='rounded text-white'>
                                <span className='text-white'>{btnText}</span>
                            </button>
                        </div>

                        <div className="notice">
                            <p>Your ad has been saved and can be viewed in ads history</p>
                        </div>
                    </div>
                </div>
            </div>
    )
}

export default Submit;
 