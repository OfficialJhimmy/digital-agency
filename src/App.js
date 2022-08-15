import React, { useEffect, useState, Suspense } from "react";
import "./App.scss";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Homepage from "./pages/homepage/homepage";
import PublisherForm from "./pages/publisher-form/publisher-form";
import Home from "./pages/home/home";
import SMM from "./pages/dashboard/SMM/SMM";
import AdvertiserNotifications from "./pages/dashboard/notifications/notifications";
import SMMHISTORY from "./pages/dashboard/SMMHISTORY/SMMHISTORY";
import Packages from "./pages/dashboard/packages/packages";
import RequestStatus from "./pages/RequestStatus/RequestStatus";
import ProtectedRoute from "./ProtectedRoute";
import ProtectedRouteAdmin from "./ProtectRouteAdmin";
import Error404 from "./pages/Error404/Error404";
import CustomLoader from "./components/CustomLoader/CustomLoader";



// axios.defaults.baseURL = 'https://moovitdigital.com/api';
// axios.defaults.headers.post['Content-Type'] = 'application/json';
// axios.defaults.headers.post['Accept'] = 'application/json';
// const token = localStorage.getItem("auth_token");
// axios.defaults.headers.common['Authorization'] = token;

const About = React.lazy(() => import("./pages/aboutPage/about"));
const Contact = React.lazy(() => import("./pages/contact/contact"));
const AdvertiserPage = React.lazy(() =>
  import("./pages/AdvertiserPage/AdvertiserPage")
);
const PublisherPage = React.lazy(() =>
  import("./pages/publisherPage/Publisher")
);
const Package = React.lazy(() => import("./pages/Packages/Packages"));
const Login = React.lazy(() => import("./pages/Login/Login"));
const Register = React.lazy(() => import("./pages/register/register"));
const UserRegistration = React.lazy(() => import("./pages/userReg/userReg"));
const EmailVerification = React.lazy(() =>
  import("./pages/email-verification/email.verification")
);
const AccountType = React.lazy(() => import("./pages/accountType/accountType"));
const AdminRegistation = React.lazy(() =>
  import("./pages/admin/admin-registration/admin-registration")
);
const AdminLogin = React.lazy(() =>
  import("./pages/admin/admin-login/admin-login")
);
const ForgetPassword = React.lazy(() =>
  import("./pages/forgotPassword/ForgetPassword")
);
const ResetPassword = React.lazy(() =>
  import("./pages/resetpassword/Resetpassword")
);
const ResendVerification = React.lazy(() =>
  import("./pages/ResendVerification/ResendVerification")
);

//Advertiser Dashboard
const Dashboard = React.lazy(() => import("./pages/dashboard/dashboard"));
const CreateAds = React.lazy(() =>
  import("./pages/dashboard/createAds/createAds")
);
const Pricing = React.lazy(() => import("./pages/dashboard/pricing/pricing"));
const Call = React.lazy(() => import("./pages/dashboard/call/call"));
const Review = React.lazy(() => import("./pages/dashboard/review/review"));
const Approved = React.lazy(() =>
  import("./pages/dashboard/approved/approved")
);
const AdHistory = React.lazy(() =>
  import("./pages/dashboard/ads-history/ads.history")
);
const PaymentHistory = React.lazy(() =>
  import("./pages/dashboard/payment-history/payment-history")
);
const Profile = React.lazy(() => import("./pages/dashboard/profile/profile"));
const Support = React.lazy(() => import("./pages/dashboard/support/support"));
const Submit = React.lazy(() => import("./pages/dashboard/submit/Submit"));
const RunningAds = React.lazy(() =>
  import("./pages/dashboard/ads-history/runningAds/runningAds")
);
const PublisherAds = React.lazy(() =>
  import("./pages/dashboard/ads-history/publisher-ads/PublisherAds")
);
const EditProfile = React.lazy(() =>
  import("./pages/dashboard/edit-profile/EditProfile")
);

//Publisher Dashboard
const PublisherDashboard = React.lazy(() =>
  import("./pages/publisher-dashboard/pb-dashboard/pb-dashboard")
);
const PublisherPaymentHistory = React.lazy(() =>
  import("./pages/publisher-dashboard/pb-payment/pb-payment")
);
const PublisherAdHistory = React.lazy(() =>
  import("./pages/publisher-dashboard/pb-adsHistory/pb-adsHistory")
);
const PublisherAdcode = React.lazy(() =>
  import("./pages/publisher-dashboard/adcodes/Adcodes")
);
const PublisherProfile = React.lazy(() =>
  import("./pages/publisher-dashboard/pb-profile/PublisherProfile")
);
const PublisherEditProfile = React.lazy(() =>
  import("./pages/publisher-dashboard/editprofile/PublisherEditProfile")
);
const PublisherSupport = React.lazy(() =>
  import("./pages/publisher-dashboard/pb-support/publisherSupport")
);
const PublisherNotifications = React.lazy(() =>
  import("./pages/publisher-dashboard/notifications/PublisherNotifications")
);
const Withdraw = React.lazy(() =>
  import("./pages/publisher-dashboard/withdraw/withdraw")
);

//Admin Dashboard
const Admin = React.lazy(() => import("./pages/admin/admin"));
const Advertisers = React.lazy(() =>
  import("./pages/admin/allAdvertisers/advertisers")
);
const AllPublishers = React.lazy(() =>
  import("./pages/admin/publishers/publishers")
);
const AllMarketer = React.lazy(() =>
  import("./pages/admin/markteter/marketer")
);
const AdvertiserPreview = React.lazy(() =>
  import("./pages/admin/advertiserPreview/advertiserPreview")
);
const AdminPreview = React.lazy(() =>
  import("./pages/admin/preview/AdminPreview")
);
const PublisherPreview = React.lazy(() =>
  import("./pages/admin/publisherPreview/PublisherPreview")
);
const MarketerActivity = React.lazy(() =>
  import("./pages/admin/activity/activity")
);
const Message = React.lazy(() => import("./pages/admin/messages/messages"));
const AdminProfile = React.lazy(() =>
  import("./pages/admin/admin-profile/ad-profile")
);
const AdminMainProfile = React.lazy(() =>
  import("./pages/admin/adminProfile/AdminProfile")
);
const AddBudget = React.lazy(() => import("./pages/admin/addBudget/addBudget"));
const AddGraphic = React.lazy(() =>
  import("./pages/admin/addGraphic/addGraphic")
);
const AddStaff = React.lazy(() => import("./pages/admin/add-staff/add-staff"));
const AdsTicket = React.lazy(() =>
  import("./pages/admin/ads-ticket/ads-ticket")
);
const Notifications = React.lazy(() =>
  import("./pages/admin/notifications/notifications")
);

//Marketer Dashboard

const MarketerNotification = React.lazy(() =>
  import("./pages/marketer/notification/Notification")
);
const Tickets = React.lazy(() => import("./pages/marketer/tickets/Tickets"));
const Adcodes = React.lazy(() => import("./pages/marketer/adcode/Adcodes"));
const CreateBanner = React.lazy(() =>
  import("./pages/marketer/createBanner/createBanner")
);
const MarketerProfile = React.lazy(() =>
  import("./pages/marketer/profile/profile")
);
const MarketerEditProfile = React.lazy(() =>
  import("./pages/marketer/edit-profile/edit-profile")
);
const MarketerDashboard = React.lazy(() =>
  import("./pages/marketer/dashboard/dashboard")
);
const MarketerPreview = React.lazy(() =>
  import("./pages/marketer/preview/preview")
);

function App() {
  const [navBackground, setNavBackground] = useState("transparent");
  const token = localStorage.getItem("auth_token");
  const role = localStorage.getItem("auth_role");
  useEffect(() => {
    document.addEventListener("scroll", () => {
      const backgroundcolor = window.scrollY < 120 ? "transparent" : "#FFFAEB";
      setNavBackground(backgroundcolor);
    });
  }, []);

  return (
    <div className="App">
      <Router>
        <Route
          exact
          path="/"
          render={() => <Homepage navBackground={navBackground} />}
        />
        <Route
          exact
          path="/home"
          render={() => <Home navBackground={navBackground} />}
        />
        {/* <Route exact path='/advertiser/dashboard' render = {() => (token && role) ? <Dashboard/> : <Login/>} /> */}
        {/* <Suspense fallback={<div> Loading... </div>}> */}
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Route
            path="/about"
            component={() => <About navBackground={navBackground} />}
          />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Route
            path="/contact"
            component={() => <Contact navBackground={navBackground} />}
          />
        </Suspense>
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Switch>
            <Route
              exact
              path="/advertiser"
              render={() => <AdvertiserPage navBackground={navBackground} />}
            />
            <Route
              exact
              path="/publisher"
              render={() => <PublisherPage navBackground={navBackground} />}
            />
            <Route
              exact
              path="/packages"
              render={() => <Package navBackground={navBackground} />}
            />
            {/* <Route exact path="*">
              <Error404 navBackground={navBackground} />
            </Route> */}
          </Switch>
        </Suspense>
        <Suspense fallback={<div></div>}>
          <Switch>
            <Route
              exact
              path="/login"
              render={() => <Login navBackground={navBackground} />}
            />
            <Route
              exact
              path="/register"
              render={() => <Register navBackground={navBackground} />}
            />
            <Route
              exact
              path="/user-registration"
              render={() => <UserRegistration navBackground={navBackground} />}
            />
            <Route
              exact
              path="/email-verification"
              render={() => <EmailVerification navBackground={navBackground} />}
            />
            <Route
              exact
              path="/account-type"
              render={() => <AccountType navBackground={navBackground} />}
            />
            <Route
              exact
              path="/admin-registration"
              render={() => <AdminRegistation navBackground={navBackground} />}
            />
            <Route
              exact
              path="/admin-login"
              render={() => <AdminLogin navBackground={navBackground} />}
            />
            <Route
              exact
              path="/resend-verification"
              render={() => (
                <ResendVerification navBackground={navBackground} />
              )}
            />
            <Route
              exact
              path="/forget-password"
              render={() => <ForgetPassword navBackground={navBackground} />}
            />
            <Route
              exact
              path="/reset-password"
              render={() => <ResetPassword navBackground={navBackground} />}
            />
          </Switch>
        </Suspense>
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Switch>
            <ProtectedRoute
              exact
              path="/dashboard/advertiser"
              component={Dashboard}
            />
            <ProtectedRoute exact path="/create-ads" component={CreateAds} />
            <ProtectedRoute
              exact
              path="/create-ads/pricing"
              component={Pricing}
            />
            <ProtectedRoute exact path="/request-call" component={Call} />
            <ProtectedRoute exact path="/review" component={Review} />
            <ProtectedRoute exact path="/approved" component={Approved} />
            <ProtectedRoute exact path="/ads-history" component={AdHistory} />
          </Switch>
        </Suspense>
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Switch>
            <ProtectedRoute
              exact
              path="/publisher-ads"
              component={PublisherAds}
            />
            <ProtectedRoute
              exact
              path="/socialmedia-ads"
              component={RunningAds}
            />
            <ProtectedRoute
              exact
              path="/payment-history"
              component={PaymentHistory}
            />
            <ProtectedRoute exact path="/profile" component={Profile} />
            <ProtectedRoute exact path="/support" component={Support} />
            <ProtectedRoute
              exact
              path="/advertiser/edit-profile"
              component={EditProfile}
            />
          </Switch>
        </Suspense>
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Switch>
            <ProtectedRoute
              exact
              path="/dashboard/publisher"
              component={PublisherDashboard}
            />
            <ProtectedRoute
              exact
              path="/publisher-payment-history"
              component={PublisherPaymentHistory}
            />
            <ProtectedRoute
              exact
              path="/publisher-ads-history"
              component={PublisherAdHistory}
            />
            <ProtectedRoute
              exact
              path="/publisher/adcode"
              component={PublisherAdcode}
            />
          </Switch>
        </Suspense>
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Switch>
            <ProtectedRoute
              exact
              path="/publisher/withdraw"
              component={Withdraw}
            />
            <ProtectedRoute
              exact
              path="/publisher/profile"
              component={PublisherProfile}
            />
            <ProtectedRoute
              exact
              path="/publisher/edit-profile"
              component={PublisherEditProfile}
            />
            <ProtectedRoute
              exact
              path="/publisher/support"
              component={PublisherSupport}
            />
            <ProtectedRoute
              exact
              path="/publisher/notifications"
              component={PublisherNotifications}
            />
          </Switch>
        </Suspense>
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Switch>
            <ProtectedRouteAdmin exact path="/admin" component={Admin} />
            <ProtectedRouteAdmin
              path="/admin/preview"
              component={AdminPreview}
            />
            <ProtectedRouteAdmin
              exact
              path="/admin/advertiser/preview"
              component={AdvertiserPreview}
            />
            <ProtectedRouteAdmin
              exact
              path="/admin/publisher/preview"
              component={PublisherPreview}
            />
            <ProtectedRouteAdmin
              exact
              path="/admin/marketer/activity"
              component={MarketerActivity}
            />
            <ProtectedRouteAdmin
              exact
              path="/admin/advertisers"
              component={Advertisers}
            />
            <ProtectedRouteAdmin
              exact
              path="/admin/publisher"
              component={AllPublishers}
            />
            <ProtectedRouteAdmin
              exact
              path="/admin/marketer"
              component={AllMarketer}
            />
            <ProtectedRouteAdmin path="/admin/message" component={Message} />
            <ProtectedRouteAdmin
              path="/admin/update"
              component={AdminProfile}
            />
            <ProtectedRouteAdmin
              path="/admin/profile"
              component={AdminMainProfile}
            />
            <ProtectedRouteAdmin exact path="/add-staff" component={AddStaff} />
            <ProtectedRouteAdmin
              exact
              path="/new-ads-ticket"
              component={AdsTicket}
            />
            <ProtectedRouteAdmin
              exact
              path="/notification"
              component={Notifications}
            />
            <ProtectedRouteAdmin path="/new-budget" component={AddBudget} />
            <ProtectedRouteAdmin path="/new-graphic" component={AddGraphic} />
            {/* {
              token ? () 
              : (<Redirect to='/admin-login' />)
            } */}
          </Switch>
        </Suspense>
        {/* <Suspense fallback={<div>Loading...</div>}>
          <Switch>
            
          </Switch>
        </Suspense> */}
        <Suspense
          fallback={
            <div>
              <CustomLoader />
            </div>
          }
        >
          <Switch>
            <ProtectedRouteAdmin
              exact
              path="/marketer/dashboard"
              component={MarketerDashboard}
            />
            <ProtectedRouteAdmin
              path={`/marketer/preview-advert`}
              component={MarketerPreview}
            />
            <ProtectedRouteAdmin
              exact
              path="/marketer/notification"
              component={MarketerNotification}
            />
            <ProtectedRouteAdmin
              exact
              path="/marketer/tickets"
              component={Tickets}
            />
            <ProtectedRouteAdmin
              exact
              path="/create-adcode"
              component={Adcodes}
            />
            <ProtectedRouteAdmin
              exact
              path="/create-banner"
              component={CreateBanner}
            />
            <ProtectedRouteAdmin
              exact
              path="/marketer/profile"
              component={MarketerProfile}
            />
            <ProtectedRouteAdmin
              exact
              path="/marketer/edit-profile"
              component={MarketerEditProfile}
            />
          </Switch>
        </Suspense>

        <Route
          exact
          path="/advertiser/notifications"
          component={AdvertiserNotifications}
        />
        <Route
          exact
          path="/publisher-form"
          render={() => <PublisherForm navBackground={navBackground} />}
        />
        <Route exact path="/request-status" component={RequestStatus} />
        <Route exact path="/advertiser/packages" component={Packages} />
        <Route exact path="/smm" component={SMM} />
        <Route exact path="/smm-history" component={SMMHISTORY} />
        {/* <Route exact path='/' component={SMMHISTORY}/>       */}
        {/* <Route exact path="*" component={Error404} /> */}
      </Router>
    </div>
  );
}

export default App;
