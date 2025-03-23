import React, { useRef, useState, useEffect } from "react";
import ExcelDropBox from "./ExcelDropBox/ExcelDropBox";

import CompareArrowsIcon from "@mui/icons-material/CompareArrows";

import ArrowUpwardIcon from "@mui/icons-material/ArrowUpward";

import MoreVertIcon from "@mui/icons-material/MoreVert";

import { TextareaAutosize } from "@mui/base";

import ChatContent from "./ChatContent";

import PopupForm from "./PopupForm/PopupForm";

import Dropdown from "./Dropdowns/Dropdown";

import { chartGenerator, exceuteQuery, loadTablesApi } from "../../Api";

import Swal from "sweetalert2";

import { Menu, MenuItem, Button } from "@mui/material";

import AssessmentIcon from "@mui/icons-material/Assessment";

import PieChartIcon from "@mui/icons-material/PieChart";

import InsightsIcon from "@mui/icons-material/Insights";

import BarChartIcon from "@mui/icons-material/BarChart";

import ClearIcon from "@mui/icons-material/Clear";
import DbSlider from "./DbSlider/DbSlider";

const ChatBox = () => {
  const [query, setQuery] = useState("");

  const [isSliderVisible, setIsSliderVisible] = useState(true);

  const chatContainerRef = useRef(null);

  const [DbResponse, setDbResponse] = useState(null);

  const [chatMessages, setChatMessages] = useState([]);

  const [selectedDataSource, setSelectedDataSource] = useState(
    localStorage.getItem("selectedDataSource") || "File Upload (Excel/CSV)"
  );

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const [chartResponse, setChartResponse] = useState();

  const [chartType, setChartType] = useState(null);

  const [anchorEl, setAnchorEl] = useState(null);

  const openDropdown = (event) => setAnchorEl(event.currentTarget);

  const closeDropdown = () => setAnchorEl(null);

  useEffect(() => {
    localStorage.setItem("selectedDataSource", selectedDataSource);
  }, [selectedDataSource]);

  const handleDataSourceChange = (newDataSource) => {
    setSelectedDataSource(newDataSource);
    setTimeout(() => {
      window.location.reload();
    }, 100);
  };

  const DataSourceDropDown = () => {
    return (
      <Dropdown
        options={["File Upload (Excel/CSV)", "Connect Personal database"]}
        label={"Data Source"}
        onSelect={handleDataSourceChange}
        defaultValue={selectedDataSource}
      />
    );
  };

  const UploadedTablesDropDown = () => {
    return (
      <Dropdown
        options={uploadedFiles}
        label={"Selected Tables"}
        defaultValue={"Loaded Tables"}
      />
    );
  };

  const SelectOperationDropdown = () => {
    return (
      <Dropdown
        options={["Data Analysis", "Data Transformation"]}
        label="Select Operation"
      />
    );
  };

  const sendMessage = async () => {
    if (!query.trim()) return;

    const newMessage = { userQuery: query, aiResponse: "..." };

    setChatMessages((prevMessages) => [...prevMessages, newMessage]);

    setQuery("");

    try {
      const response = await exceuteQuery(query);
      setChatMessages((prevMessages) => {
        return prevMessages.map((message, index) =>
          index === prevMessages.length - 1
            ? { ...message, aiResponse: response }
            : message
        );
      });
    } catch (e) {
      console.error("Error fetching AI response:", e);

      setChatMessages((prevMessages) =>
        prevMessages.map((message, index) =>
          index === prevMessages.length - 1
            ? { ...message, aiResponse: "Error fetching response." }
            : message
        )
      );
    }
  };

  return (
    <div className="bg-gray-100 text-gray-900 min-h-screen w-full fixed overflow-hidden">
      <div className="flex flex-col lg:flex-row h-[98vh] w-full mt-3">
        <div
          id="slider"
          className="w-full min-h-[95vh] max-h-[95vh] overflow-y-auto lg:overflow-y-scroll lg:w-[30%] xl:w-[26%] p-6 shadow-lg rounded-xl bg-gray-100"
        >
          <h2 className="text-3xl lg:text-3xl font-bold text-blue-500 mb-5 ml-6">
            Start Analysis Data
          </h2>
          <div className="my-5 mb-10 w-full max-w-md lg:max-w-full">
            <DataSourceDropDown onSelect={setSelectedDataSource} />
          </div>
          {selectedDataSource === "File Upload (Excel/CSV)" && <ExcelDropBox />}
          {selectedDataSource === "Connect Personal database" && (
            <div className="w-[21rem] px-3">
              <div className="flex flex-row gap-5 w-full max-w-md lg:max-w-xs">
                {[" Vertica", " MySQL"].map((db) => (
                  <button
                    key={db}
                    onClick={() => setIsPopupOpen(true)}
                    className="px-10 py-2 border-2 border-blue-500 text-white hover:bg-blue-600 font-semibold rounded-lg text-lg bg-blue-500 hover:text-white transition-all duration-300 ease-in-out shadow-sm hover:shadow-lg focus:outline-none"
                  >
                    {db}
                  </button>
                ))}
              </div>
              <DbSlider DbResponse={DbResponse} />
            </div>
          )}
          {isPopupOpen && (
            <PopupForm
              isOpen={isPopupOpen}
              onClose={() => setIsPopupOpen(false)}
              setDbResponse={setDbResponse}
            />
          )}
        </div>
        <div
          id="chatbox"
          className="flex-1 h-[98vh] pb-5 p-3 rounded-xl shadow-lg flex flex-col justify-between"
        >
          <div className="flex-1 overflow-y-auto px-4 py-4 rounded-lg border border-gray-300 relative">
            <div
              id="toggleSlider"
              className="w-10 h-10 bg-blue-200 rounded-full flex items-center justify-center cursor-pointer transition hover:bg-blue-300 left-2 top-2"
              onClick={() => setIsSliderVisible((prev) => !prev)}
            >
              <CompareArrowsIcon fontSize="large" />
            </div>
            <div
              className="absolute right-2 top-2 cursor-pointer p-2 rounded-full transition hover:bg-gray-200"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <MoreVertIcon />
            </div>
            {isDropdownOpen && (
              <div className="absolute right-8 top-8 bg-gray-100 shadow-lg rounded-md p-2 z-10">
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  Table Preview
                </button>
                <button
                  onClick={() => setIsDropdownOpen(false)}
                  className="block px-4 py-2 hover:bg-gray-200 w-full text-left"
                >
                  Other Options
                </button>
              </div>
            )}
            <ChatContent
              chartResponse={chartResponse}
              chartType={chartType}
              chatMessages={chatMessages}
              chatContainerRef={chatContainerRef}
              query={query}
              setChartResponse={setChartResponse}
              setChartType={setChartType}
            />
          </div>
          <div className="mt-3 w-full max-w-6xl mx-auto bg-gray-50 shadow-lg rounded-2xl border py-4">
            <div className="flex flex-col w-full max-w-5xl mx-auto py-3 px-3 bg-gray-50">
              <div className="flex items-center space-x-5 w-full">
                <div className="relative">
                  <Button
                    onClick={openDropdown}
                    className="bg-gray-200 text-gray-700 rounded-lg transition-all duration-300"
                  >
                    <AssessmentIcon style={{ width: "50px", height: "50px" }} />
                  </Button>
                  <Menu
                    anchorEl={anchorEl}
                    open={Boolean(anchorEl)}
                    onClose={closeDropdown}
                    anchorOrigin={{ vertical: "top", horizontal: "left" }}
                    transformOrigin={{ vertical: "bottom", horizontal: "left" }}
                  >
                    <MenuItem
                      onClick={() => {
                        setChartType("bar");
                        closeDropdown();
                      }}
                    >
                      <BarChartIcon className="text-blue-500" /> Bar Chart
                    </MenuItem>
                    <MenuItem
                      onClick={() => {
                        setChartType("line");
                        closeDropdown();
                      }}
                    >
                      <InsightsIcon className="text-green-500" /> Line Chart
                    </MenuItem>
                    {chartResponse && chartResponse?.multi_value === false && (
                      <MenuItem
                        onClick={() => {
                          setChartType("pie");
                          closeDropdown();
                        }}
                      >
                        <PieChartIcon className="text-red-500" /> Pie Chart
                      </MenuItem>
                    )}
                  </Menu>
                </div>
                <TextareaAutosize
                  minRows={1}
                  maxRows={4}
                  placeholder="Type your message..."
                  value={query}
                  onChange={(e) => setQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      sendMessage();
                    }
                  }}
                  className="flex-1 bg-gray-50 text-gray-800 px-4 py-3 rounded-lg border border-gray-300 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none placeholder-gray-500 shadow-sm resize-none transition-all duration-200"
                />
                <button
                  onClick={sendMessage}
                  className="bg-blue-500 hover:bg-blue-600 text-white rounded-full flex items-center justify-center transition-transform duration-300 transform hover:scale-110 shadow-md"
                >
                  <ArrowUpwardIcon style={{ width: "40px", height: "40px" }} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatBox;
