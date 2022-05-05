// import React, { useState } from 'react';
// import { Link } from 'react-router-dom';
// import '../steps/steps.scss';
// import AdvertiserSteps from './advertiser/advertiser';
// import PublisherSteps from './publisher/publisher';

// const Steps = () => {

//     const [show, setShow] = useState("block");
//     const [show1, setShow1] = useState("none");
//     const [active, setActive] = useState({
//         advertiser : true,
//         publisher : false
//     });

//     const handleClick = (e) => {
//         e.preventDefault();
//         setShow("block");
//         setShow1("none");
//         setActive({advertiser : true, publisher : false})
//     }
//     const handleClick1 = (e) => {
//         e.preventDefault();
//         setShow("none");
//         setShow1("block");
//         setActive({advertiser : false, publisher : true})
//         // setIndicator(150);
//     }
//     return (
//         <div className="steps">
//             <div className="container">
//                 <h1 className="text-center">Quick Steps</h1>
//                 <div className="headings justify-content-center">
//                     <h5 onClick={handleClick} style={{border : active.advertiser ? " 1px solid grey"  : "none"}} >Advertiser</h5>
//                     <h5 onClick={handleClick1} style={{border : active.publisher ? " 1px solid grey"  : "none"}}>Publisher</h5>
//                     {/* <div className="indicator" style={{ left : `${indicator}px` }}></div> */}
//                 </div>
//                 <AdvertiserSteps show={show}/>
//                 <PublisherSteps show1={show1}/>

//                 <button><Link to='/register'>Register</Link></button>
//             </div>
//         </div>
//     )
// }

// export default Steps

import React, { useState } from "react";
import { Link } from "react-router-dom";
import "../steps/steps.scss";
import AdvertiserSteps from "./advertiser/advertiser";
import PublisherSteps from "./publisher/publisher";

const Steps = () => {
  const [active, setActive] = useState({
    advertiser: true,
    publisher: false,
  });

  const handleAdvertiser = (e) => {
    e.preventDefault();
    setActive({ advertiser: true, publisher: false });
  };

  const handlePublisher = (e) => {
    e.preventDefault();
    setActive({ advertiser: false, publisher: true });
  };
  return (
    <div className="steps">
      <div className="container">
        <h1 className="text-center">Quick Steps</h1>
        <div className="captions text d-flex justify-content-between align-items-center">
          <button
            onClick={handleAdvertiser}
            style={{
              background: active.advertiser ? "#333333" : "transparent",
              color: active.advertiser ? "white" : "#333333",
            }}
          >
            Advertiser
          </button>
          <button
            onClick={handlePublisher}
            style={{
              background: active.publisher ? "#333333" : "transparent",
              color: active.publisher ? "white" : "#333333",
            }}
          >
            Publisher
          </button>
        </div>
        <AdvertiserSteps active={active} />
        <PublisherSteps active={active} />

        <div className="audience">
          <h3>
            Join us today and <br></br> <span>grow your audience</span>
          </h3>
          <p>
            Show what you do to millions of potential customers <br></br>and get
            visible, set up your brand for success
          </p>
        </div>
        <button className="get-started">
          <Link to="/register">Get started</Link>
        </button>
      </div>
    </div>
  );
};

export default Steps;
