// import React from 'react';


// import svg1 from "../img/familiar-1.svg"
// import svg2 from "../img/fast-2.svg"
// import svg3 from "../img/cb-icon-affordability.svg"

// const CardSection = () => {
//   return (
//     <>
//     <div className="bg-white flex flex-row justify-center text-center items-center py-12">
//            <h1 className="mt-10 text-4xl text-gray-800 font-bold font-serif">
//              Analytics Solution That Fits Your Needs
//            </h1>
//          </div>

//      <div id="cards" className="flex flex-row justify-between px-10 bg-white">
//      {[
//         {
       
//          title: "Connect Data",
//          features: [
//            "Access 80+ data Connection.",
//            "Create Schema by joining datasets.",
//            "Select schema to perform analysis",
//          ],
//        },
//        {
        
//          title: "Connect Data",
//          features: [
//            "Access 80+ data Connection.",
//            "Create Schema by joining datasets.",
//            "Select schema to perform analysis",
//          ],
//        },
//        {
        
//          title: "Connect Data",
//          features: [
//            "Access 80+ data Connection.",
//            "Create Schema by joining datasets.",
//            "Select schema to perform analysis",
//          ],
//        },
//        {
        
//          title: "Get insights?",
//          features: [
//            "Ex: What is the sales last quarter?",
//            "Ex: How to connect with database?",
//            "Ex: How to write prompt to extract all Data?",
//          ],
//        },
//      ].map((card, index) => (
//        <div
//          key={index}
//          className="mx-5 w-full md:w-[30%] lg:w-[30%] p-6 bg-blue-200 border border-gray-200 rounded-lg shadow-lg hover:shadow-2xl transition-all duration-300 ease-in-out transform hover:bg-blue-100 mb-6 "
//        >
//          <img
//            src={card.img}
//            className="w-10 h-10 text-blue-500 mb-3"
//            alt={card.title}
//          />
//          <a href="#">
//            <h5 className="mb-2 text-2xl font-semibold text-gray-800">
//              {card.title}
//            </h5>
//          </a>
//          {card.features.map((feature, idx) => (
//            <li key={idx} className="mb-3 text-gray-600">
//              {feature}
//            </li>
//          ))}
//        </div>
//      ))}
//    </div>
// </>
//    );
// }

// export default CardSection;
import  { useState, useEffect, useRef } from "react";

const CardSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const heroRef = useRef(null);

  const steps = [
    {
      title: "Connect Data",
      description: [
        "Access 80+ data connections.",
        "Create schema by joining datasets.",
        "Select schema to perform analysis.",
      ],
      prompt: "Build a booking website where clients can see my availability and schedule appointments. Send confirmation emails and reminders.",
    },
    {
      title: "Get insights?",
      description: "Review the proposed architecture and components for your application before proceeding with the build.",
      prompt: "Great! I'll create a booking website with availability calendar, appointment scheduling, and email notifications. Should we include user authentication?",
    },
    {
      title: "Refine through feedback",
      description: "Provide feedback on the initial version to refine and improve your application.",
      prompt: "Here's the first version of your booking site. What would you like to change about the calendar view or booking flow?",
    },
    {
      title: "Launch in minutes",
      description: "Deploy your application with a single click and share it with the world.",
      prompt: "Your booking website is ready for deployment! Just click the Launch button to make it live.",
    },
  ];

  const handleNextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    } else {
      // Reset to first step if at the end
      setActiveStep(0);
    }
  };

  useEffect(() => {
    const handleMouseMove = (e) => {
      if (heroRef.current) {
        const rect = heroRef.current.getBoundingClientRect();
        setMousePosition({
          x: e.clientX - rect.left,
          y: e.clientY - rect.top,
        });
        setIsHovering(true);
      }
    };

    const handleMouseLeave = () => {
      setIsHovering(false);
    };

    const hero = heroRef.current;
    if (hero) {
      hero.addEventListener("mousemove", handleMouseMove);
      hero.addEventListener("mouseleave", handleMouseLeave);
    }

    return () => {
      if (hero) {
        hero.removeEventListener("mousemove", handleMouseMove);
        hero.removeEventListener("mouseleave", handleMouseLeave);
      }
    };
  }, []);

  return (
    <div 
      ref={heroRef}
      className="flex flex-col md:flex-row items-start gap-16 bg-slate-950 text-white p-8 md:p-16 relative overflow-hidden"
    >
      {/* Cursor-following neon particles */}
      <div 
        className="pointer-events-none absolute w-12 h-12 rounded-full bg-cyan-500 opacity-30 blur-xl transition-all duration-100 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.3 : 0
        }}
      />
      <div 
        className="pointer-events-none absolute w-6 h-6 rounded-full bg-blue-400 opacity-50 blur-md transition-all duration-200 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 0.5 : 0
        }}
      />
      <div 
        className="pointer-events-none absolute w-3 h-3 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(34,211,238,0.8)] transition-all duration-75 ease-out"
        style={{ 
          left: `${mousePosition.x}px`, 
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          opacity: isHovering ? 1 : 0
        }}
      />

      {/* Left Side - Steps */}
      <div className="flex flex-col gap-8 max-w-md">
        <div className="flex items-center gap-2">
          <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-white opacity-80"
          >
            <path
              d="M12 4L3 15H21L12 4Z"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <p className="text-white opacity-80">Click each step to see how it works:</p>
        </div>

        <div className="space-y-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="flex items-start gap-3 cursor-pointer"
              onClick={() => setActiveStep(index)}
            >
              <div
                className={`mt-1.5 w-3 h-3 rounded-full ${
                  index === activeStep ? "bg-green-500" : "bg-gray-500"
                }`}
              ></div>
              <div>
                <h3
                  className={`text-2xl font-semibold mb-1 ${
                    index === activeStep ? "text-white" : "text-gray-400"
                  }`}
                >
                  {step.title}
                </h3>
                {index === activeStep && (
                  <p className="text-gray-300">
                    {Array.isArray(step.description)
                      ? step.description.map((line, i) => <div key={i}>{line}</div>)
                      : step.description}
                  </p>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Right Side - Preview Card */}
      <div className="mt-8 md:mt-0 w-full md:w-auto position-absolute">
        <div
          className="bg-slate-950 border border-gray-800 rounded-3xl overflow-hidden max-w-xl cursor-pointer transition-all duration-300 hover:border-purple-500/50 hover:shadow-lg hover:shadow-purple-500/20"
          onClick={handleNextStep}
        >
          <div className="p-16 pt-20 pb-12 flex flex-col items-center justify-center bg-black bg-opacity-50 relative">
            {/* Purple Logo */}
            <div className="flex mb-6">
              <div className="flex gap-0.5">
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
              </div>
              <div className="flex gap-0.5 ml-0.5">
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
                <div className="w-4 h-4 bg-purple-400 rounded-full"></div>
              </div>
            </div>

            <h2 className="text-2xl mb-8">Use AI and analyze your business better!!</h2>

            {/* Prompt Box */}
            <div className="w-full bg-slate-900 border border-gray-800 rounded-xl p-6 mb-8">
              <p className="transition-all duration-300">{steps[activeStep].prompt}</p>
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-3">
              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg px-4 py-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 18.5C15.5899 18.5 18.5 15.5899 18.5 12C18.5 8.41015 15.5899 5.5 12 5.5C8.41015 5.5 5.5 8.41015 5.5 12C5.5 15.5899 8.41015 18.5 12 18.5Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Voice
              </button>

              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg px-4 py-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M21 12L9 12M21 6H3M21 18H3"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Attach
              </button>

              <button className="flex items-center gap-2 bg-slate-800 hover:bg-slate-700 transition-colors rounded-lg px-4 py-2">
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M9 16L15 8M12 3C7.02944 3 3 7.02944 3 12C3 16.9706 7.02944 21 12 21C16.9706 21 21 16.9706 21 12C21 7.02944 16.9706 3 12 3Z"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
                Enhance Prompt
              </button>

              <button className="flex items-center justify-center bg-purple-500 hover:bg-purple-600 transition-colors rounded-lg p-2">
                <svg
                  width="24"
                  height="24"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M12 19V5M12 5L5 12M12 5L19 12"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            </div>

            {/* Step indicator */}
            <div className="absolute bottom-4 left-0 right-0 flex justify-center gap-2">
              {steps.map((_, index) => (
                <div
                  key={index}
                  className={`w-2 h-2 rounded-full ${
                    index === activeStep ? "bg-purple-500" : "bg-gray-600"
                  }`}
                ></div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CardSection;

