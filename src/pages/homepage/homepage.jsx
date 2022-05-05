import React, { Suspense } from 'react'
import '../homepage/homepage.scss';
import Faq from '../../components/FAQ/faq'
import Hero from '../../components/hero/hero'
import Steps from '../../components/steps/steps'
import LoadingScreen from '../../components/loadingScreen/loadingScreen';
import Heroscreen from '../../components/heroScreen/heroscreen';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';

// const Services = React.lazy(() => import ('../../components/services/services'));
const Services = React.lazy(() => import ('../../components/services/services'));
// const Heroscreen = React.lazy(() => import('../../components/heroScreen/heroscreen'));
// const Steps = React.lazy(() => import('../../components/steps/steps'));
// const Faq = React.lazy(() => import('../../components/FAQ/faq'));

const Homepage = ({navBackground}) => {

    return (
        <div className="homepage">
                <LoadingScreen />
                <Header navBackground={navBackground}/>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                <Heroscreen /> 
                {/* </Suspense> */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Services />
                </Suspense>
                {/* <Suspense fallback={<div>Loading...</div>}> */}
                    <Steps />
                    <Faq />
                {/* </Suspense> */}
                <Hero/>
                <Footer />
        </div>
    )
}

export default Homepage;
