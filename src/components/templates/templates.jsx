import React, { useState} from 'react';
import '../templates/template.scss';
import { Link } from 'react-router-dom';
import swal from 'sweetalert';
import caretRight from '../../assets/CaretRight.svg';
import ellipse1 from '../../assets/Ellipse 27.svg';
import ellipse2 from '../../assets/Ellipse 28.svg';
import tick from '../../assets/Frame 338.svg';
import size from '../../assets/Rectangle 80.svg';
import display1 from '../../assets/display.png';
import display2 from '../../assets/display2.png';
import display3 from '../../assets/display3.png';
import Dialog from '../dailog/dialog';


const Templates = ({showNext3, setShowNext2, setShowNext3, setShowNext4, show, createAds, dialog, setDialog, setDisabled}) => {
    
    const [styling] = useState({
        style1 : true,
    })

    const handleBack = (e) => {
        e.preventDefault();
        setShowNext2("block");
        setShowNext3("none");
    }
    const handlePopUp = (e) => {
        e.preventDefault();
        if(createAds.budget_id !== "" && createAds.graphic_id !== "" && createAds.phone !== "" && createAds.title !== "" && createAds.demographics !== "" && createAds.start !== "" && createAds.end !=="" && createAds.location !== ""){
            setDialog(true);
        }else{
            swal("Oops!", "Please enter all required fields!", "warning");
        }
        
    }
    const handleNext = (e) => {
        e.preventDefault();
        if(createAds.budget_id !== "" && createAds.graphic_id !== "" && createAds.phone !== "" && createAds.title !== "" && createAds.start !== "" && createAds.end !=="" && createAds.location !== ""){
            setShowNext3("none")
            setShowNext4("block")
        }else{
            swal("Oops!", "Please enter all required fields!", "warning");
        }
    }

    return (
        <div style={{display : showNext3}} id="temp">
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
                    <img src={ellipse1} alt="ellipse1" />
                    <p>Pick a template</p>
                </div>
                <div className="item ">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Make payment</p>
                </div>
                <div className="item last">
                    <img src={ellipse2} alt="ellipse1" />
                    <p>Have a call</p>
                </div>    
            </div>
            <div className="content-form">
                <div className="row_">
                    <h5>Banner Format</h5>
                    <div className="template-fold mt-4">
                        <div className="template-tags">
                            <div className="tag-item" style={{border : styling.style1 ? "1px solid blue" : "1px solid #c4c4c4"}}>
                                <img src={size} alt="" />
                                <p>Templates</p>
                            </div>

                        </div>
                        <div className="template-image mb-4 ">
                            <p className="text-center">What your banner will look like.</p>
                            <div className="bordering text-center">
                                <img src={display1} alt="" />
                                <img src={display2} alt="" />
                                <img src={display3} alt="" />
                            </div>
                            <div className="direction-btn">
                                <p className="back" onClick={handleBack}>Back</p>
                                <div className="btn">
                                    <button className='px-4 py-2 rounded' onClick={handleNext}>
                                        Proceed to Payment
                                    </button>
                                </div>          
                            </div>
                            <div className="row justify-content-center mt-5">
                                <div className="col-lg-8">
                                    <h5 className='mb-4 mt-5 text-center'>Not ready yet? <span>Want to make payment later</span></h5>
                                    <button className='rounded px-4 py-2 blk' onClick={handlePopUp}>Save Ads</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>                
            </div>
            <Dialog dialog={dialog} setDialog={setDialog} show={show} />
        </div>
    )
}

export default Templates;