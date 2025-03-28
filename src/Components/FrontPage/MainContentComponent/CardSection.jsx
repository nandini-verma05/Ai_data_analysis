import { useState, useRef } from "react";

const CardSection = () => {
  const [activeStep, setActiveStep] = useState(0);
  const heroRef = useRef(null);

  const steps = [
    {
      title: "Upload Your CSV File",
      description: [
        "Easily upload your CSV files in seconds.",
        "Supports multiple file formats and large datasets.",
        "Automatically detect and parse columns.",
      ],
      prompt: "Upload your CSV file to get started.",
    },
    {
      title: "Ask Questions to the Chatbot",
      description: [
        "Ask natural language questions about your data.",
        "Ex: What are the total sales for last quarter?",
        "Ex: Show me the top 5 performing products.",
        "Ex: How many customers are from New York?",
      ],
      prompt: "Ask me anything about your data!",
    },
    {
      title: "Visualize and Analyze",
      description: [
        "Generate charts and graphs instantly.",
        "Ex: Create a bar chart of monthly sales.",
        "Ex: Plot a trend line for customer growth.",
        "Ex: Compare revenue across regions.",
      ],
      prompt: "Visualize your data with a single click.",
    },
    {
      title: "Export and Share Insights",
      description: [
        "Export your analysis as PDF, Excel, or images.",
        "Share insights with your team via a single link.",
        "Collaborate in real-time with your colleagues.",
      ],
      prompt: "Export and share your insights effortlessly.",
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

  return (
    <div
      ref={heroRef}
      className="flex flex-col md:flex-row items-start gap-16 bg-[#240046] text-white p-8 md:p-16 relative overflow-hidden"
    >
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
      <div className="mt-8 md:mt-0 w-full md:w-auto ml-auto pr-10 relative">
      <div
          className="bg-slate-950 border border-gray-800 rounded-3xl overflow-hidden max-w-xl cursor-pointer transition-all duration-300 hover:border-pink-500/50 hover:shadow-lg hover:shadow-purple-500/20"
          onClick={handleNextStep}
        >
          <div className="p-16 pt-20 pb-12 flex flex-col items-center justify-center bg-black bg-opacity-50 relative">
            {/* Purple Logo */}
            <div className="flex mb-6">
              <div className="flex gap-0.5">
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
              </div>
              <div className="flex gap-0.5 ml-0.5">
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
                <div className="w-4 h-4 bg-pink-400 rounded-full"></div>
              </div>
            </div>

            <h2 className="text-2xl mb-8">Analyze Your Data with AI-Powered Insights!</h2>

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