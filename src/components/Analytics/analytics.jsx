import React from "react";
import "../Analytics/analytics.scss";
import img1 from "../../assets/ChartBar.svg";
import img2 from "../../assets/ChartLineUp.svg";
import img3 from "../../assets/Percent.svg";
import img4 from "../../assets/TrendUp.svg";

const Analytics = () => {
  return (
    <div className="analytics">
      <div className="container wrapper">
        <div className="content">
          <h3>Stay on track with our analytics</h3>
          {/* <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis deserunt mollit dolore cillum minim tempor enim. Elit aute irure tempor cupidatat incididunt sint deserunt ut voluptate aute id deserunt nisi.</p> */}
          <button>Get started</button>

          <div className="images">
            <img src={img1} className="img1" alt="chart bar icon" />
            <img src={img2} className="img2" alt="chart line icon" />
            <img src={img3} className="img3" alt="percent icon" />
            <img src={img4} className="img4" alt="treding up icon" />
            <img src={img1} className="img5" alt="chart bar icon" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
