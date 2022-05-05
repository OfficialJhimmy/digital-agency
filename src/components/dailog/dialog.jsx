import React from 'react';
import smile from '../../assets/LOGO 2-STAND.svg';
import '../dailog/dialog.scss';
import Loader from "react-loader-spinner";

const Dialog = ({handleSubmit, dialog, setDialog, show}) => {
    
    const closePopUp = (e) => {
        e.preventDefault();
        setDialog(false);
    }
    return(
        <div className="dialog" style={{display : dialog ? "block" : "none"}}>
            <div className="card">
                {
                    show ? <>
                        <img src={smile} alt="" />
                        <h5>Submit Ads</h5>
                        <p>Please review your request and click 'submit' to proceed</p>
                        <div className="btns">
                            <button className='close' onClick={closePopUp}>Close</button>
                            <button type="submit" onClick={handleSubmit}>Submit Ads</button>
                        </div>
                    </> : <div className="spinn" style={{height : "300px"}} >
                            <Loader type="TailSpin" color="#EE315D" height={80} width={80} />
                            <p className="mt-2">Just a moment...</p>
                        </div>
                }
            </div>
        </div>
    )
}

export default Dialog;