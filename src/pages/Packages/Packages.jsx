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
                    <h6 className="title">Pepper Jollof </h6>
                    <h4>
                      #50,000<span>/month</span>
                    </h4>
                    <p>(#550,000/year)</p>
                    <ul>
                      <li>Social media strategy</li>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>12 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>3 promoted on Facebook or Instagram</li>
                      <li>A recommendation call once a month</li>
                      <li>Audience Targeting</li>
                    </ul>
                    <h6>
                      This pack includes creative designs, update, situational
                      report and recommendation
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Sunday Jollof</h6>
                    <h4>
                      #170,000<span>/month</span>
                    </h4>
                    <p>(#1.9 million/year)</p>
                    <ul>
                      <li>Social media strategy</li>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>20 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>1 week PPC (Pay Per Click) ads campaign</li>
                      <li>6 promoted on Facebook or Instagram</li>
                      <li>A recommendation call once a month</li>
                      <li>Audience Targeting</li>
                      <li>Content Calendar</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                      This pack includes creative designs, update, situational
                      reports, recommendation, promotion and an assigned account manager.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Local Jollof</h6>
                    <h4>
                      #250,000<span>/month</span>
                    </h4>
                    <p>(#2.8 million/year)</p>
                    <ul>
                      <li>Social media strategy</li>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>12 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>2 weeks PPC (Pay Per Click) ads campaign</li>
                      <li>6 Facebook/Instagram Ad campaign</li>
                      <li>A recommendation call once a month</li>
                      <li>Audience Targeting</li>
                      <li>250,000 CPM on publishers websites</li>
                      <li>Content Calendar</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Owambe Jollof </h6>
                    <h4>
                      #500,000<span>/month</span>
                    </h4>
                    <p>(#5.5 million/year)</p>
                    <ul>
                      <li>Management of 3 Social Media Accounts</li>
                      <li>20 creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>1 Custom Video Creation</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>10 Facebook/Instagram campaign Ads</li>
                      <li>Lookalike Audience Targeting</li>
                      <li>Social Media Strategy </li>
                      <li>500,000 CPM on publishers websites</li>
                      <li>1000 real followers </li>
                      <li>Content Calendar</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Jollof Jollof </h6>
                    <h4>
                      #1.5 million<span>/month</span>
                    </h4>
                    <p>(#16 million/year)</p>
                    <ul>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>Unlimited creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>20 promoted on Facebook or Instagram</li>
                      <li>1 month PPC (Pay Per Click) ads campaign</li>
                      <li>Lookalike Audience Targeting</li>
                      <li>Social Media Strategy </li>
                      <li>Over 750,000 CPM on publishers websites</li>
                      <li>2 Custom Video Creation</li>
                      <li>1500 real followers </li>
                      <li>Content Calendar</li>
                      <li>Email marketing</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                  <div className="tier">
                    <h6 className="title">Pantry Jollof</h6>
                    <h4>
                      #2 million<span>/month</span>
                    </h4>
                    <p>(#11 million/year)</p>
                    <ul>
                      <li>Management of 4 Social Media Accounts</li>
                      <li>Unlimited creative designs monthly</li>
                      <li>Monthly Custom Reports</li>
                      <li>Performance evaluation and recommendation</li>
                      <li>20 promoted on Facebook or Instagram</li>
                      <li>1 month PPC (Pay Per Click) ads campaign</li>
                      <li>Lookalike Audience Targeting</li>
                      <li>Social Media Strategy </li>
                      <li>Over 1 million CPM on publishers websites</li>
                      <li>3 Custom Video Creation</li>
                      <li>2000 real followers </li>
                      <li>Comment Moderation</li>
                      <li>Content Calendar</li>
                      <li>Email marketing</li>
                      <li>Account Manager Customer care</li>
                    </ul>
                    <h6>
                    This pack includes creative designs, update, situational reports, recommendation, promotions, an assigned account manager and advert on blogs and websites.
                    </h6>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="special-offer text-center mt-5 mb-4">
<h2>Need something different?</h2>
<div className="inner-text">
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
      <Footer />
    </div>
  );
};

export default Package;
