/* eslint-disable no-unused-vars */
import { useEffect, useRef, useState } from "react";
import Selfaware from "./components/Selfaware";
import { gsap } from "gsap";
import "./App.css";
import { useAnimate } from "framer-motion";
function App() {
  const overlayRef = useRef(null);
  const textRef = useRef(null);
  const motionRef = useRef(null);

  const [scope, animate] = useAnimate();
  useEffect(() => {
    const overlay = overlayRef.current;
    const text = textRef.current;
    const motionElement = motionRef.current;
    const bottom = motionElement.getBoundingClientRect().bottom;
    const left = motionElement.getBoundingClientRect().left;
    const top = motionElement.getBoundingClientRect().top + 20;
    const sequence = [
      [motionElement, { opacity: 0, visibility: 'hidden'}, { at: 0 }],
      [overlay, { clipPath: `inset(${top}rem ${left}rem ${bottom}rem ${left}rem)`  }, { at: 0.8}],
      [motionElement, { opacity: 1,  visibility: 'visible' }, { at: 0.7 }],
      [overlay, { opacity: 0 }, { at: 2 }],
    ];

    animate(sequence, { duration:2 });
  });

  return (
    <>
      <div className="super-container">
        <div className="wrap">
            <div ref={motionRef}>
              <Selfaware />
            </div>
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
