import React, { useState, useEffect, useRef } from "react";
import AccountCircleIcon from "@mui/icons-material/AccountCircle";
import SmartToyIcon from "@mui/icons-material/SmartToy";
import { motion } from "framer-motion";
import Chart from "./Charts/Chart";
import PieChartIcon from "@mui/icons-material/PieChart";
import InsightsIcon from "@mui/icons-material/Insights";
import BarChartIcon from "@mui/icons-material/BarChart";
import { chartGenerator } from "../../Api";

const ResponseCard = ({ response }) => {
  const [loading, setLoading] = useState(true);
  const [animatedText, setAnimatedText] = useState("");
  const responseEndRef = useRef(null);

  useEffect(() => {
    if (!response?.aiResponse) return;
    setLoading(true);
    setAnimatedText("");

    const hasResponse =
      response.aiResponse.summary ||
      response.aiResponse.sql_query ||
      (Array.isArray(response.aiResponse.optimizations) &&
        response.aiResponse.optimizations.length > 0) ||
      (Array.isArray(response.aiResponse.result) &&
        response.aiResponse.result.length > 0) ||
      (Array.isArray(response.aiResponse.analysis) &&
        response.aiResponse.analysis.length > 0);

    if (!hasResponse) {
      setLoading(false);
      return;
    }

    setTimeout(() => {
      setLoading(false);
      if (typeof response.aiResponse.summary === "string") {
        let index = 0;
        const summaryText = response.aiResponse.summary;
        const interval = setInterval(() => {
          setAnimatedText((prev) => prev + summaryText[index]);
          index++;
          if (index >= summaryText.length) clearInterval(interval);
        }, 50);

        return () => clearInterval(interval);
      }
    }, 1500);
  }, [response]);

  function formatSummary(summaryObj) {
    if (!summaryObj) return null;

    let summary = summaryObj.trim();
    const paragraphs = summary.split("\n").filter((para) => para.trim() !== "");

    return (
      <div className="bg-gray-100 rounded-lg max-w-5xl p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">Summary : </h2>
        <div className="text-gray-800 leading-relaxed text-lg font-semibold">
          {paragraphs.map((para, index) => {
            if (/^# /.test(para)) {
              return (
                <h2
                  key={index}
                  className="text-3xl font-bold text-blue-600 underline mb-2"
                >
                  {para.replace(/^# /, "")}
                </h2>
              );
            } else if (/^## /.test(para)) {
              return (
                <h3
                  key={index}
                  className="text-2xl font-bold text-blue-600 underline mb-2"
                >
                  {para.replace(/^## /, "")}
                </h3>
              );
            } else if (/^\*\*(.*?)\*\*/.test(para)) {
              return (
                <h3
                  key={index}
                  className="text-2xl font-bold text-blue-600 underline mb-2"
                >
                  {para.replace(/\*\*/g, "")}
                </h3>
              );
            }
            para = para.replace(/\*\*/g, "");

            // Bullet points
            if (/^\*\s/.test(para)) {
              return (
                <ul key={index} className="list-disc ml-6 mb-2">
                  <li
                    dangerouslySetInnerHTML={{
                      __html: formatText(para.replace(/^\*\s/, "")),
                    }}
                  />
                </ul>
              );
            }

            // Default Paragraph
            return (
              <p
                key={index}
                className="mb-4"
                dangerouslySetInnerHTML={{ __html: formatText(para) }}
              ></p>
            );
          })}
        </div>
      </div>
    );
  }

  // Helper function to format percentages and numbers dynamically
  function formatText(text) {
    return text.replace(
      /(\d+(\.\d+)?%)/g,
      '<span class="text-red-600 font-bold">$1</span>'
    );
  }

  // const fetchChartData = async () => {
  //   if (!response?.userQuery) return;
  //   try {
  //     const chartData = await chartGenerator(response.userQuery);
  //     setChartResponse(chartData);
  //     console.log("Chart Data: " + chartData)
  //   } catch (error) {
  //     console.error("Error fetching chart data:", error);
  //   }
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   fetchChartData();
  // }, []);

  useEffect(() => {
    responseEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [response]);

  return (
    <div className="w-full space-y-4 overflow-y-auto bg-gray-100">
      <div className="flex justify-end ">
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
          className="flex items-center space-x-3  text-gray-900 border border-spacing-2 p-3 rounded-lg max-w-xl"
        >
          <AccountCircleIcon className="" height="10px" />
          <p className="text-2xl font-semibold">
            {response?.userQuery || "N/A"}
          </p>
        </motion.div>
      </div>

      <div className="flex flex-col justify-start bg-gray-100">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex flex-col  max-w-4xl space-y-5"
        >
          <div className="flex items-center space-x-5">
            <SmartToyIcon className="text-3xl text-green-600" />
            <h2 className="text-3xl font-bold text-gray-800">AI Response:</h2>
          </div>

          {loading ? (
            <div className="text-gray-900 text-md flex items-center space-x-2 animate-pulse">
              <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce"></span>
              <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-150"></span>
              <span className="w-2 h-2 bg-gray-700 rounded-full animate-bounce delay-300"></span>
              <p>Generating Response...</p>
            </div>
          ) : (
            <>
              {response?.aiResponse?.summary && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3, duration: 0.5 }}
                  className="bg-gray-100 p-3 space-y-5 "
                >
                  {formatSummary(response.aiResponse.summary)}
                </motion.div>
              )}
              {response?.aiResponse?.formatted_result && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-gray-100 p-3 rounded space-y-5 border border-gray-300 "
                >
                  <h2 className="text-2xl font-bold text-blue-800 underline">
                    {" "}
                    Result:
                  </h2>
                  <pre className="bg-white p-5 text-lg rounded text-gray-900 border border-gray-300 whitespace-pre-wrap">
                    {String(response.aiResponse.formatted_result)}
                  </pre>
                </motion.div>
              )}

              {response?.aiResponse?.sql_query && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.5, duration: 0.5 }}
                  className="bg-gray-100 p-3 rounded space-y-5 border border-gray-300 "
                >
                  <h2 className="text-2xl font-bold text-blue-800 underline">
                    SQL Query:
                  </h2>
                  <pre className="bg-white p-5 rounded  text-lg  text-gray-800 border border-gray-300 whitespace-pre-wrap">
                    {String(response.aiResponse.sql_query)}
                  </pre>
                </motion.div>
              )}

              {response?.aiResponse?.optimizations &&
                response.aiResponse.optimizations.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.5, duration: 0.5 }}
                    className="bg-gray-100 p-3 rounded space-y-5 border border-gray-300 "
                  >
                    <h2 className="text-2xl font-bold text-blue-800 underline">
                      SQL Query:
                    </h2>
                    <pre className="bg-white p-5 rounded  text-lg  text-gray-800 border border-gray-300 whitespace-pre-wrap">
                      {String(
                        response.aiResponse.optimizations.map(
                          (item, key) => item
                        )
                      )}
                    </pre>
                  </motion.div>
                )}

              {Array.isArray(response?.aiResponse?.table_result) &&
                response.aiResponse.table_result.length > 0 && (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 1.1, duration: 0.5 }}
                    className="max-h-80 overflow-y-auto border border-gray-300 rounded-2xl shadow-md"
                  >
                    <table className="min-w-full bg-white p-2">
                      <thead className="bg-gray-300 text-gray-800 sticky top-0 z-10 shadow-sm">
                        <tr>
                          <th className="py-3 px-4 text-left font-semibold border-b border-gray-300">
                            S No.
                          </th>

                          {Object.keys(response.aiResponse.table_result[0]).map(
                            (key) => (
                              <th
                                key={key}
                                className="py-3 px-4 text-left font-semibold border-b border-gray-300"
                              >
                                {key}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>

                      <tbody className="overflow-y-auto">
                        {response.aiResponse.table_result.map((row, index) => (
                          <tr
                            key={index}
                            className="hover:bg-gray-100 transition"
                          >
                            <td className="py-3 px-4 border-b border-gray-300 text-gray-700 text-sm text-left">
                              {index + 1}
                            </td>

                            {Object.values(row).map((value, idx) => (
                              <td
                                key={idx}
                                className="py-3 px-4 border-b border-gray-300 text-gray-700 text-sm text-left"
                              >
                                {String(value)}
                              </td>
                            ))}
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </motion.div>
                )}
            </>
          )}
        </motion.div>
      </div>

      <div ref={responseEndRef}></div>
    </div>
  );
};

export default ResponseCard;
