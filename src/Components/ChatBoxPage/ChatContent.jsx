import { useEffect, useRef, useState } from "react";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import Typed from "typed.js";
import ResponseCard from "./ResponseCard";
import Chart from "./Charts/Chart";
import { chartGenerator } from "../../Api";

const ChatContent = ({
  chartResponse,
  chatMessages,
  setChartResponse,
  setChartType,
  chartType,
}) => {
  const typedElement = useRef(null);
  const chatContainerRef = useRef(null);

  const fetchChartData = async () => {
    if (!chatMessages[chatMessages.length - 1]?.userQuery) return;
    try {
      setChartType(null);
      setChartResponse(null);
      const chartData = await chartGenerator(
        chatMessages[chatMessages.length - 1].userQuery
      );
      setChartResponse(chartData);
      console.log("Chart Data: " + chartData);
    } catch (error) {
      console.error("Error fetching chart data:", error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
    fetchChartData();
  }, [chatMessages]);

  useEffect(() => {
    const typed = new Typed(typedElement.current, {
      strings: [
        "Welcome to Data Analysis AI software! Let's start interacting with modern AI.",
      ],
      typeSpeed: 30,
      backDelay: 1000,
      showCursor: true,
      cursorChar: "_",
    });

    return () => typed.destroy();
  }, []);

  return (
    <div className="p-5 w-full max-w-6xl mx-auto flex flex-col">
      <div className="flex flex-col items-center text-center w-full max-w-5xl">
        <SmartToyIcon
          fontSize="large"
          className="text-blue-600 animate-pulse"
        />
        <h1 className="text-3xl font-extrabold text-gray-800 mt-4">
          Connect Data with AI
        </h1>
        <p className="mt-2 text-lg text-gray-600">
          Write a prompt to generate results.
        </p>
        <div className="mt-2 bg-gray-100 px-6 py-2  border border-gray-100">
          <span
            className="auto-type text-2xl text-blue-700 font-medium"
            ref={typedElement}
          ></span>
        </div>
      </div>

      <div
        ref={chatContainerRef}
        className="w-full bg-gray-100 max-w-5xl mt-10 space-y-4"
      >
        {chatMessages &&
          chatMessages.map((chat, index) => (
            <ResponseCard key={index} response={chat} />
          ))}
        {chartResponse && chartType && (
          <div className="">
            <Chart
              key={chartType + JSON.stringify(chartResponse)}
              chartResponse={chartResponse}
              chartType={chartType}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default ChatContent;
