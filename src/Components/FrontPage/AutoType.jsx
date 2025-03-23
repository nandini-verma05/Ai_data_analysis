import React, { useEffect, useRef } from "react";
import Typed from "typed.js";

const AutoType = () => {
  const typedElement = useRef(null); // Reference for the target element

  useEffect(() => {
    const options = {
      strings: ["Welcome to our software", "Data Analysis with AI", "Ask what you want to do?"],
      typeSpeed: 50,
      backSpeed: 20,
      loop: true,
      showCursor: true,
      cursorChar: "|",
    };

    const typed = new Typed(typedElement.current, options);

    return () => {
      typed.destroy();
    };
  }, []);

  return <span className="auto-type" ref={typedElement}></span>;
};

export default AutoType;
