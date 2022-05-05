import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import '../../components/loadingScreen/style.scss';
import logo from '../../assets/LOGO 1.svg';
import smile from '../../assets/LOGO 1-WINK.svg';
import stand from '../../assets/LOGO 2-STAND.svg';
import wink from '../../assets/LOGO 3-SMILE.svg';

const LoadingScreen = ({state, setState}) => {
    let loader = useRef(null);
    let text1 = useRef();
    let text2 = useRef();
    let text3 = useRef();
    let text4 = useRef();
    let text5 = useRef();
    let wrapper = useRef();
    let icons = useRef();
    let image1 = useRef();
    let image2 = useRef();
    let image3 = useRef();
    let smile_ = useRef();
    let stand_ = useRef();
    let wink_ = useRef();
    let play_icons = useRef();

    const tl= gsap.timeline();
    
    useEffect(() => {
        gsap.to(loader.current, {
            duration : 0,
            css:{display : "block"}
        });
        gsap.from(wrapper.current, {
            duration : .8,
            delay : .2,
            ease : "power3.inOut",
            stagger : {
                amount : 0.3
            }
        })
        tl.to([text1.current, text2.current, text3.current, text4.current, text5.current], {
            duration : 2.6,
            opacity :  1,
            delay : .8,
            stagger: {
                amount : 0.3
            },
            // skewY : 10,
            // repeat: -1,
            // repeatDelay: 1,
            // yoyo: true,
            ease : "power4.Out",
        })
        tl.to([text1.current, text2.current, text3.current, text4.current, text5.current], {
            duration : 1.8,
            opacity : 0,
            delay : .6,
            ease : "Power3.inOut",
            stagger : {
                amount : 0.5
            }
        })
        gsap.to(icons.current, {
            delay : .5,
            opacity : 1
        })
        tl.to(image1.current, {
            y : -20,
            duration : 2.8,
            opacity :  1,
            delay : .6,
            // stagger: {
            //     amount : .5
            // },
            ease : "power4.Out"
        })
        gsap.to(play_icons.current, {
            delay : 5,
            opacity : 1
        })
        tl.to([smile_.current, stand_.current, wink_.current], {
            duration : 1.8,
            opacity :  1,
            delay : .6,
            stagger: {
                amount : .5
            },
            ease : "power4.Out" 
        })
        
        //shrink the image

        // tl.to(image1.current, {
        //     duration : 8,
        //     delay : .6,
        //     stagger: {
        //         amount : .5
        //     },
        //     ease : "power4.Out",
        //     css : {
        //         width : "130px"
        //     }
        // })
        gsap.to(loader.current, {
            height : 0,
            delay: 12.6,
            duration : 1.2,
            ease : "power3.inOut",
        })
        gsap.to(loader.current, {
            duration : 0,
            delay : 13.2,
            opacity : 0,
            css : {
                display : "none"
            }
        })
    }, [])
    return(
        <div className="loading" ref={ loader } >
            <div className="wrapper" ref={wrapper}>
                <p ref={ text1}>You</p>
                <p ref={ text2 }>+</p>
                <p ref= { text3 }>Us</p>
                <p ref={ text4 }>=</p>
                <p ref={ text5 }>Possibilities</p>
            </div>

            <div ref={icons} className="icons">
                <img ref={image1} src={logo} alt="" width="250px"/>
            </div> 
            <div ref={play_icons} className="play-icons">
                <img ref={smile_} src={smile} alt="" />
                <img ref={stand_} src={stand} alt=""/>
                <img ref={wink_} src={wink} alt="" />
            </div>         
        </div>
    )
}

export default LoadingScreen;