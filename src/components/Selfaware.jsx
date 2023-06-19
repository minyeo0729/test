/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useRef, useCallback, } from "react";
import { gsap } from "gsap";
import { CSSPlugin } from "gsap/CSSPlugin";
gsap.registerPlugin(CSSPlugin);

const getRandomPosition = (wrapperWidth, wrapperHeight, size) => {
  //calculating columns and rows
  const numColumns = Math.floor(wrapperWidth / size);
  const numRows = Math.floor(wrapperHeight / size);
  const numBoxes = numColumns * numRows;

  const positions = new Set();
  const getRandomCoordinate = (max) => Math.floor(Math.random() * max) * size;
  const remainingSpace = wrapperHeight - numRows * size;
  const remainingSpaceX = wrapperWidth - numColumns * size;

  while (positions.size < numBoxes) {
    const left = getRandomCoordinate(numColumns);
    let top = getRandomCoordinate(numRows);
    const adjustedTop = remainingSpace > 0 ? top + remainingSpace : top;
    let adjustedLeft = remainingSpaceX > 0 ? left + remainingSpaceX : left;

    positions.add(`${adjustedLeft},${adjustedTop}`);
  }

  //convert position to an array of object
  return Array.from(positions).map((position) => {
    const [left, top] = position.split(",");
    return { left: parseInt(left), top: parseInt(top) };
  });
};




const letters = 
  ["M0 0H150V19.93H26.5V64.72H147.87V82.93H26.5V150H0V0Z", "M0 0H99.57C112.53 0 122.64 3.64 129.92 10.93C137.19 18.22 140.83 27.79 140.83 39.64C140.83 51.49 137.1 60.75 129.64 67.39C122.18 74.03 112.16 77.35 99.57 77.35H86C95.54 78.07 103.63 80.99 110.3 86.14C116.96 91.28 123.07 98.57 128.64 108C134.2 117.43 141.32 131.43 150 150H127.08L123.96 143.57C115.65 126 109.38 113.54 105.16 106.18C100.94 98.82 96.39 93.4 91.5 89.89C86.61 86.39 80.37 84.64 72.8 84.64H20.36L20.54 150H0V0ZM93.15 64.07C102.44 64.07 109.29 62.25 113.69 58.61C118.09 54.97 120.29 49.93 120.29 43.5C120.29 35.36 118.15 29.43 113.87 25.71C109.59 22 102.68 20.14 93.15 20.14H20.17L20.35 64.07H93.15Z", "M35.09 140.66C23.79 134.45 15.12 125.67 9.07001 114.33C3.02001 102.99 0 89.88 0 74.99C0 60.1 3.02001 46.99 9.07001 35.65C15.11 24.31 23.79 15.54 35.09 9.32C46.39 3.11 59.67 0 74.92 0C90.17 0 103.48 3.11 114.84 9.32C126.2 15.54 134.9 24.28 140.94 35.55C146.98 46.82 150.01 59.97 150.01 75C150.01 90.03 146.99 103.18 140.94 114.45C134.89 125.72 126.19 134.46 114.84 140.68C103.48 146.89 90.18 150 74.92 150C59.66 150 46.39 146.89 35.09 140.68V140.66ZM104.33 124.06C112.75 119.48 119.3 112.99 123.99 104.59C128.68 96.19 131.02 86.32 131.02 74.98C131.02 63.64 128.67 53.74 123.99 45.27C119.3 36.8 112.75 30.31 104.33 25.8C95.91 21.29 86.11 19.04 74.92 19.04C63.73 19.04 54.07 21.29 45.6 25.8C37.13 30.31 30.57 36.8 25.94 45.27C21.31 53.74 18.99 63.65 18.99 74.98C18.99 86.31 21.3 96.19 25.94 104.59C30.57 112.99 37.13 119.48 45.6 124.06C54.07 128.64 63.85 130.92 74.92 130.92C85.99 130.92 95.91 128.63 104.33 124.06Z","M0.919922 0.270004H22.6999L129.52 121.13V0.270004H150.92V150.27H128.95L22.3199 29.63V150.27H0.919922V0.270004Z","M64.7901 20.2H0.0900879V0.270004H150.09V20.2H85.2101V150.27H64.8001V20.2H64.7901Z", "M0.870117 0.359985H150.87V20.29H27.2001V65.08H148.75V83.29H27.2001V130.43H150.87V150.36H0.870117V0.359985Z","M0.919922 0.270004H22.6999L129.52 121.13V0.270004H150.92V150.27H128.95L22.3199 29.63V150.27H0.919922V0.270004Z", "M0 0H66.62C92.78 0 113.21 6.43001 127.93 19.29C142.64 32.15 150 50.72 150 75C150 99.28 142.64 118.04 127.93 130.82C113.22 143.61 92.78 150 66.62 150H0V0ZM66.62 130.07C79.02 130.07 89.74 127.86 98.81 123.43C107.87 119 114.85 112.65 119.76 104.36C124.66 96.08 127.12 86.29 127.12 75C127.12 63.71 124.67 53.93 119.76 45.64C114.86 37.36 107.87 31 98.81 26.57C89.75 22.14 79.02 19.93 66.62 19.93H22.89V130.07H66.62Z" 
];

const colorArray = [
  { background: "#019563", color: "#F7D9D3" },
  { background: "#f3be22", color: "#5267AB" },
  { background: "#5267AB", color: "#F7D9D3" },
  { background: "#ee4e2b", color: "#f3be22" },
];

const useMediaQuery = (query, initialValue) => {
  const [matches, setMatches] = useState(initialValue);

  useEffect(() => {
    const mediaQuery = window.matchMedia(query);

    const handleChange = (event) => {
      setMatches(event.matches);
    };

    setMatches(mediaQuery.matches); // Initial update
    mediaQuery.addEventListener('change', handleChange);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, [query]);

  return matches;
};

const Selfaware = () => {
  //variables
  const wrapper = useRef(null);
  const cloneRef = useRef(null);
  const circleRef = useRef(null);

  const [boxPositions, setBoxPositions] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);

  const [newWrapWidth, setNewWrapWidth] = useState(0);
  const [newWrapHeight, setNewWrapHeight] = useState(0);
  const [svgWidth, setSvgWidth] = useState('150');

  const [showCircle, setShowCircle] = useState(false);
  const [circlePosition, setCirclePosition] = useState({ x: 0, y: 0 });

  const [textColor, setTextColor] = useState("");
  const [bgColor, setBgColor] = useState("");

  const randomlyPosition = useCallback(() => {
    const positions = getRandomPosition( newWrapWidth, newWrapHeight, svgWidth );

    const slicedPositions = positions
      .slice(0, letters.length)
      .map((position, index) => ({
        ...position,
        rotation: Math.random() * 360, 
        opacity: 1,
      }));

    setBoxPositions(slicedPositions);
  }, [newWrapWidth, newWrapHeight, svgWidth]);

  //circle spreading when its clicked
  const makeCircle = useCallback((event) => {
    //calculating position of clicked circle
    const divOffsetLeft = wrapper.current.getBoundingClientRect().left;
    const divOffsetTop = wrapper.current.getBoundingClientRect().top;
    const clientXRelativeToDiv = event.clientX - divOffsetLeft;
    const clientYRelativeToDiv = event.clientY - divOffsetTop;
    //if its more close to right, the speed issue occur. 
    setCirclePosition({ x: clientXRelativeToDiv, y: clientYRelativeToDiv });
    setShowCircle(true);
  }, []);
  const spread = useCallback(() => {
    const circle = circleRef.current;
    let tl = gsap.timeline();

    if (showCircle) {
      tl.fromTo(
        circle,
        {
          width: "200rem",
          height: "200rem",
          scale: 1,
          borderRadius: "100%",
          duration: 1.5,
        },
        {
          scale: 20,
          borderRadius: "50%",
          duration: 1,
          onComplete: () => {
            tl.invalidate();
          },
        }
      );
    }
  }, [showCircle]);

  //change color when its clicked
  const changeColor = useCallback(() => {
    setCurrentIndex((prevIndex) => {
      //calculating index, when it's exceeds, wrap around to 0
      const newIndex = (prevIndex + 1) % letters.length;
      const colorIndex =
        newIndex >= colorArray.length ? newIndex - colorArray.length : newIndex;

      //update colors based on the newIndex
      setTextColor(colorArray[colorIndex].color);
      setBgColor(colorArray[colorIndex].background);

      return newIndex;
    });
  }, []);

  const handleClick = useCallback(
    (event) => {
      //make sure shaking element only has click event.
      let clickedElement = event.target; // span would be event target.
      while (clickedElement !== null) {
        if (clickedElement.classList.contains("shake")) {
          randomlyPosition();
          makeCircle(event);
          changeColor();
          break;
        }
        clickedElement = clickedElement.parentElement;
      }
    },
    [randomlyPosition, makeCircle, changeColor]
  );

  useEffect(() => {
    setNewWrapWidth(wrapper.current.clientWidth);
    setNewWrapHeight(wrapper.current.clientHeight);

    //intro motion
    const defaultPositions = [];
    const centerX = newWrapWidth / 2 - svgWidth / 2;
    const centerY = newWrapHeight / 2 - svgWidth / 2;
    for (let i = 0; i < letters.length; i++) {
      const defaultPosition = {
        left: centerX,
        top: centerY,
        rotation: 0,
        opacity: 0,
      };
      defaultPositions.push(defaultPosition);
    }

    setBoxPositions(defaultPositions);
    //need delay of one second for motion effect
    const randomizeTimeout = setTimeout(() => {
      randomlyPosition();
    }, 1000);

    return () => {
      clearTimeout(randomizeTimeout);
    };
  }, [newWrapHeight, newWrapWidth, randomlyPosition, svgWidth]);

  useEffect(() => {
    spread();
  }, [circlePosition, boxPositions, spread]);

  const isMobile = useMediaQuery('(max-width: 540px)', false);
  const isTablet = useMediaQuery('(min-width: 541px) and (max-width: 768px)', false);
  const isMedium = useMediaQuery('(min-width: 769px) and (max-width: 1280px)', false);

  useEffect(() => {
    if (isMobile) {
      setSvgWidth('50');
    } else if (isTablet) {
      setSvgWidth('80');
    } else if (isMedium) {
      setSvgWidth('110');
    } else {
      setSvgWidth('140');
    }
  }, [isMedium, isMobile, isTablet]);

  return (
    <div className="wrapper" ref={wrapper}>
      {boxPositions.map((position, index) => (
        <div
          className={`clone${index === currentIndex ? " shake" : ""}`}
          key={index}
          style={{
            left: position.left,
            top: position.top,
            opacity: position.opacity,
          }}
          ref={cloneRef}
          onClick={handleClick}>
          <span   style={{ transform: `rotate(${position.rotation}deg)` }}>
            <svg
              width={svgWidth}
              height={svgWidth}
              viewBox='0 0 180 180'
           
          >
              <path d={letters[index]} style={{
                "--red": textColor,
              }} />
            </svg>
          </span>
        </div>
      ))}{" "}
      {showCircle && (
        <div
          className="circle"
          style={{
            top: circlePosition.y,
            left: circlePosition.x,
            "--bg": bgColor,
          }}
          ref={circleRef}
        />
      )}{" "}
    </div>
  );
};

export default Selfaware;
