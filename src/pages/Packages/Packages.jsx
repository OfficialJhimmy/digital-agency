import React from "react";
import "../dashboard/dashboard.scss";
import "../dashboard/createAds/createAds.scss";
import "../Packages/package.scss";
import Header from "../../components/header/header";
import Footer from "../../components/footer/footer";
import RequestForm from "../../components/RequestForm/RequestForm";

const Package = ({ navBackground }) => {
  return (
    <div className="packages">
      <Header navBackground={navBackground} />
      <div className="dashboard create-ads">
        <div className="container">
          <div className="small-title">
            <div className="dashboard-main-wrapper">
              <div className="dashboard-main">
                <div className="content-form">
                  <div className="row justify-content-center">
                    <h3>Choose a package that’s right for you</h3>
                    <div className="price-list">
                      <div className="tier">
                        <h6 className="title">SMM Starter Pack </h6>
                        <h4>
                          #20,000<span>/month</span>
                        </h4>
                        <p>(#220,000/year)</p>
                        <ul>
                          <li>Management of 2 Social Media Accounts</li>
                          <li>6 creative designs monthly</li>
                          <li>Monthly Custom Reports</li>
                          <li>Performance evaluation and recommendation</li>
                        </ul>
                        <h6>
                          This pack includes creative designs, update,
                          situational report and recommendation
                        </h6>
                      </div>
                      <div className="tier">
                        <h6 className="title">SMM Brand Pack</h6>
                        <h4>
                          #50,000<span>/month</span>
                        </h4>
                        <p>(#550,000/year)</p>
                        <ul>
                          <li>Management of 4 Social Media Accounts</li>
                          <li>12 creative designs monthly</li>
                          <li>Monthly Custom Reports</li>
                          <li>Performance evaluation and recommendation</li>
                          <li>3 promoted on Facebook or Instagram</li>
                          <li>A recommendation call once a month</li>
                          <li>Audience Targeting</li>
                        </ul>
                        <h6>
                          This pack includes creative designs, update,
                          situational reports, recommendation and promotion.{" "}
                        </h6>
                      </div>
                      <div className="tier">
                        <h6 className="title">SMM Professional Pack</h6>
                        <h4>
                          #150,000<span>/month</span>
                        </h4>
                        <p>(#1.7 million/year)</p>
                        <ul>
                          <li>Management of 4 Social Media Accounts</li>
                          <li>20 creative designs monthly</li>
                          <li>Monthly Custom Reports</li>
                          <li>Performance evaluation and recommendation</li>
                          <li>6 promoted on Facebook or Instagram</li>
                          <li>A recommendation call once a month</li>
                          <li>Audience Targeting</li>
                          <li>DM Customer Care</li>
                          <li>Comment Moderation</li>
                          <li>Content Calendar</li>
                        </ul>
                        <h6>
                          This pack includes creative designs, update,
                          situational reports, recommendation, promotion and an
                          assigned account manager.{" "}
                        </h6>
                      </div>
                      <div className="tier">
                        <h6 className="title">BRAND XTRA </h6>
                        <h4>
                          #200,000<span>/month</span>
                        </h4>
                        <p>(#2.2 million/year)</p>
                        <ul>
                          <li>Management of 4 Social Media Accounts</li>
                          <li>12 creative designs monthly</li>
                          <li>Monthly Custom Reports</li>
                          <li>Performance evaluation and recommendation</li>
                          <li>6 promoted on Facebook or Instagram</li>
                          <li>A recommendation call once a month</li>
                          <li>Audience Targeting</li>
                          <li>Social Media Strategy </li>
                          <li>DM Customer Care</li>
                          <li>250,000 CPM on publishers websites</li>
                          <li>Comment Moderation</li>
                          <li>Content Calendar</li>
                        </ul>
                        <h6>
                          This pack includes creative designs, update,
                          situational reports, recommendation, promotions, an
                          assigned account manager and advert on blogs and
                          websites.
                        </h6>
                      </div>
                      <div className="tier">
                        <h6 className="title">PROFESSIONAL XTRA </h6>
                        <h4>
                          #500,000<span>/month</span>
                        </h4>
                        <p>(#5.5 million/year)</p>
                        <ul>
                          <li>Management of 3 Social Media Accounts</li>
                          <li>20 creative designs monthly</li>
                          <li>Monthly Custom Reports</li>
                          <li>Performance evaluation and recommendation</li>
                          <li>10 promoted on Facebook or Instagram</li>
                          <li>A recommendation call once a month</li>
                          <li>Lookalike Audience Targeting</li>
                          <li>Social Media Strategy </li>
                          <li>DM Customer Care</li>
                          <li>500,000 CPM on publishers websites</li>
                          <li>1 Custom Video Creation</li>
                          <li>1000 real followers </li>
                          <li>Comment Moderation</li>
                          <li>Content Calendar</li>
                        </ul>
                        <h6>
                          This pack includes creative designs, update,
                          situational reports, recommendation, promotions, an
                          assigned account manager and advert on blogs and
                          websites.{" "}
                        </h6>
                      </div>
                      <div className="tier">
                        <h6 className="title">CHERRY COMBO </h6>
                        <h4>
                          #1 million<span>/month</span>
                        </h4>
                        <p>(#11 million/year)</p>
                        <ul>
                          <li>Management of 4 Social Media Accounts</li>
                          <li>Unlimited creative designs monthly</li>
                          <li>Monthly Custom Reports</li>
                          <li>Performance evaluation and recommendation</li>
                          <li>20 promoted on Facebook or Instagram</li>
                          <li>Recommendation calls</li>
                          <li>Lookalike Audience Targeting</li>
                          <li>Social Media Strategy </li>
                          <li>DM Customer Care</li>
                          <li>Over 1 million CPM on publishers websites</li>
                          <li>2 Custom Video Creation</li>
                          <li>1500 real followers </li>
                          <li>Comment Moderation</li>
                          <li>Content Calendar</li>
                        </ul>
                        <h6>
                          This pack includes creative designs, update,
                          situational reports, recommendation, promotions, an
                          assigned account manager and advert on blogs and
                          websites.
                        </h6>
                      </div>
                    </div>
                    <div className="special-offer text-center mt-5 mb-4">
                      <h2>Need something different?</h2>
                      <div className="inner-text">
                        <h5>CHERRY SWAG</h5>
                        <p>
                          Contact us to create a customized package for your
                          company.
                        </p>
                        <RequestForm />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default Package;
