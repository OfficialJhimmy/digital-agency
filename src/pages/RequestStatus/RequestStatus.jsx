import React from 'react'
import Header from '../../components/header/header';
import statusLoader from '../../assets/status.svg';

const RequestStatus = () => {
    return (
        <div className='request-status'>
            <Header />
            <div className="status-wrapper text-center" style={{marginTop: "120px"}}>
                <div className="container">
                    <div className="row justify-content-center">
                        <div className="col-lg-6 col-sm-12">
                            <img src={statusLoader} alt="load-spinner" className="" />
                            <div className="content mt-4">
                                <h4 className='fw-bold'>Your request is being reviewed</h4>
                                <p>We have received your request and you will get notified via email as soon as we are done reviewing. Thanks for your patience</p>
                            </div>
                        </div>
                    </div> 
                </div> 
            </div>
        </div>
    )
}

export default RequestStatus;
