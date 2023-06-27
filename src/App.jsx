/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Selfaware from "./components/Selfaware";
import { gsap } from "gsap";
import "./App.css";
import { useAnimate, motion } from "framer-motion";
import splitType from "https://cdn.skypack.dev/split-type@0.3.3";
function App() {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const motionRef = useRef(null);
  const tl = gsap.timeline();


  const [scope, animate] = useAnimate();
  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const ourText = new splitType(text, { types: 'chars' })
    const chars = ourText.chars

    // tl.to(text, {
    //   color: "red", //텍스트 모션 
    // })
   
    const motionElement = motionRef.current;
    const bottom = motionElement.getBoundingClientRect().bottom;
    const left = motionElement.getBoundingClientRect().left;
    const top = motionElement.getBoundingClientRect().top + 20;
    
    const sequence = [
      [overlay, { clipPath: `inset(${top}rem ${left}rem 100rem ${left}rem)`  }, { at: 0.8}],
      [motionElement, { opacity: 1,  visibility: 'visible' }, { at: 0.7 }],
      [overlay, { opacity: 0 }, { at: 2 }],
    ];
    gsap.fromTo(
      chars, 
      { 
        y: 40,
        opacity: 0
      },
      {
        y: 0,
        opacity: 1,
        stagger: 0.03,
        duration: 1,
        ease: "power2.in",
        onComplete:()=>{
          

          animate(sequence, { duration:2 });
        }
      }
    )
  });

  return (
    <>
      <div className="super-container">
        <div className="wrap">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2 }}>
            <div ref={motionRef} style={{opacity: 0, visibility: 'hidden'}}>
              <Selfaware />
            </div>
          </motion.div>
            
        </div>
      </div>

      <div ref={scope}>
        <div className="overlay" ref={overlayRef}>
          <div className="overlay-inner">
            <div className="text" ref={textRef}>
             selfware
            </div>
          </div>
        </div>
      </div>
 
    </>
  );
}

export default App;
