import React from 'react';
import { Link } from 'react-router-dom';
import './affilations.scss';
import guard from '../../../assets/guard.svg';
import frame from '../../../assets/Frame.svg';

const Affilations = () => {
    return (
        <div className="affilations">
            <div className="container">
                <div className="row justify-content-center">
                    <div className="col-lg-10">
                        <h5>Our Partners</h5>
                        <h3>Our professional associates strengthen our reach, making your message loud and clear</h3>
                        <div className="img d-flex align-items-center justify-content-between mt-5 mb-5">
                            <img src={guard} alt="vanguard logo" />
                            <img src={frame} alt="business day logo" />
                            <img src={guard} alt="" />
                            {/* <img src={guard} alt="" /> */}
                        </div>
                        {/* <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim.</p> */}
                        {/* <Link >see more</Link> */}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Affilations
