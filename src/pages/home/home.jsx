import React, {Suspense} from 'react'
import '../homepage/homepage.scss';
// import Faq from 
import Hero from '../../components/hero/hero'
// import Steps from 
import Heroscreen from '../../components/heroScreen/heroscreen';
import Header from '../../components/header/header';
import Footer from '../../components/footer/footer';
const Services = React.lazy(() => import ('../../components/services/services'));
// const Heroscreen = React.lazy(() => import());
const Steps = React.lazy(() => import('../../components/steps/steps'));
const Faq = React.lazy(() => import('../../components/FAQ/faq'));


const Home = ({navBackground}) => {
    
    return (
        <div className="homepage">
                <Header navBackground={navBackground}/>
                {/* <Suspense> */}
                <Heroscreen /> 
                {/* </Suspense> */}
                <Suspense fallback={<div>Loading...</div>}>
                    <Services />
                </Suspense>
                <Suspense fallback={<div>Loading...</div>}>
                    <Steps />
                    <Faq />
                </Suspense>
                <Hero/>
                <Footer />
        </div>
    )
}

export default Home;
