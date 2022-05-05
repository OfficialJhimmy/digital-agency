import React from 'react';
import '../services/services.scss';
import { Swiper, SwiperSlide } from 'swiper/react';
import SwiperCore, {Autoplay, Pagination, Navigation} from 'swiper';
import 'swiper/swiper-bundle.css'
import image1 from '../../assets/Frame 439.svg';
import image2 from '../../assets/Frame 440.svg';
import image3 from '../../assets/Frame 441.svg';
import image4 from '../../assets/Frame 442.svg';
SwiperCore.use([Autoplay, Pagination, Navigation]);

const Services = () => {
    return (
        <div className="services">
            {/* <div className="container"> */}
                <div className ="service-text">
                    <div className="row__">
                        <Swiper className="desktop" slidesPerView={1}
                        spaceBetween={10}
                        navigation={true}
                        pagination={{ clickable: true }}
                        autoplay={{
                            delay: 50000,
                            disableOnInteraction: false
                        }}>
                        <SwiperSlide>
                            <div className='row frame0'>
                                <div className="col-lg-12">
                                    <div className="content-text">
                                        <p>DISCOVER WHAT'S</p>
                                        <p>INTERESTING</p>
                                        <p>ABOUT US</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='row frame1'>
                                <div className="col-lg-12">
                                    <div className="content-text">
                                        <h3>Digital<br></br> Advertisement</h3>
                                        <p>Our strategic marketing is structured to approach where we help you (the business owner or manager) clearly define what you are trying to accomplish, plan and implement specific action steps, then measure and analyze the results and repeat the process.</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='row frame2'>
                                <div className="col-lg-12">
                                    <div className="content-text">
                                        <h3>Business Advisory</h3>
                                        <p>As part of the digital advisory services, our team makes a thorough study of your business goals against digital media strategies adopted by competitors in the industry. Our digital marketing advisors deliver actionable plan of action aligned to your business objectives in the digital arena.</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='row frame3'>
                                <div className="col-lg-12">
                                    <div className="content-text">
                                        <h3>Strategy Mapping</h3>
                                        <p>We use insights and data to construct deliverables that help our clients achieve their business objectives. We are dedicated to creating strategic solutions that deliver on the goals of every brand while being economically viable and visually exciting.</p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                        <SwiperSlide>
                            <div className='row frame4'>
                                <div className="col-lg-12">
                                    <div className="content-text">
                                        <h3>Social Media Management</h3>
                                        <p>Our team has experience in creating and managing top-performing social media campaigns on networks such as Facebook, Instagram, LinkedIn and Google. Each campaign is uniquely designed to meet the goals of your business, save you time, and generate results. </p>
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    </Swiper>                    
                </div>
            </div>
        </div>
    )
}

export default Services;


// <div className="col">
//                             <div className="content-text">
//                                 {/* <img src={image1} alt="" /> */}
//                                 <h3></h3>
//                                 {/* <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis.</p> */}
//                             </div>
//                         </div>
//                         <div className="col">
//                             <div className="content-text">
//                                 {/* <img src={image2} alt="" /> */}
//                                 <h3 className="text2"></h3>
//                                 {/* <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis.</p> */}
//                             </div>
//                         </div>
//                         <div className="col">
//                             <div className="content-text">
//                                 {/* <img src={image3} alt="" /> */}
//                                 <h3 className="text3"></h3>
//                                 {/* <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis.</p> */}
//                             </div>
//                         </div>
//                         <div className="col">
//                             <div className="content-text">
//                                 {/* <img src={image4} alt="" /> */}
//                                 <h3 className="text4">Social Media Management</h3>
//                                 {/* <p>Aliqua id fugiat nostrud irure ex duis ea quis id quis ad et. Sunt qui esse pariatur duis.</p> */}
//                             </div>
//                         </div>