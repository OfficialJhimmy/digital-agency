import React from 'react';
import '../moovit/moovit.scss';
import image1 from '../../../assets/Frame 464.svg';

const Moovit = () => {
    return (
        <div className="moovit">
            <div className="container">
                <div className="row">
                    <div className="col-lg-7">
                        <div className="content">
                        <h5>MOOVIT</h5>
                        <h3>More than your typical digital marketing agency</h3>
                        <p>We help you get in front of potential clients. Get the most out of your online advertising budget with the right mix of creativity and hi-tech precision; we generate successful advertising campaigns for all types of businesses.</p>
                        </div>
                    </div>
                </div>
            </div>
            {/* <div className="shape"> */}
                <img src={image1} alt="shape" />
            {/* </div> */}
        </div>
    )
}

export default Moovit
