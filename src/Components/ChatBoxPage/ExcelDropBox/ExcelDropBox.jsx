import  { useState, useRef,useEffect } from "react";
import {  X, FileSpreadsheet,  } from "lucide-react";
import Dropdown from "../Dropdowns/Dropdown";
import { uploadFilesAPI, cleanFile, cancel_clean_file } from "../../../Api";
import Swal from "sweetalert2";
const ExcelDropBox = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [uploadStatus, setUploadStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState(null);
  const [responseData, setResponseData] = useState(null);
  const [tablePreview, setTablePreview] = useState({});
  const [uploadedFiles, setUploadedFiles] = useState([]);
  const [cleaningSummary, setCleaningSummary] = useState(null);
  const dropdownRef = useRef(null);
 
  const ShowAlert = async () => {
    if (!responseData?.files[0]?.table_name) {
      console.error("Invalid responseData:", responseData);
      Swal.fire("Error", "Invalid table data. Please try again.", "error");
      return;
    }
    const table_name = responseData.files[0].table_name;
    const { isConfirmed } = await Swal.fire({
      title: "Do you want to clean your data?",
      html: `
        <div style="
          max-height: 300px; overflow-y: auto; text-align: left; 
          padding: 10px; border: 1px solid #ccc; border-radius: 8px; 
          background-color: #f9f9f9;">
          ${cleaningSummary
            .split("\n\n")
            .map((section) => {
              const sectionTitleMatch = section.match(/^\*\*(.*?)\*\*/);
              const sectionTitle = sectionTitleMatch
                ? `<strong style="color: #007bff;">🔹 ${sectionTitleMatch[1]}</strong><br/>`
                : "";
              const sectionContent = section.replace(/\*{1,2}/g, "").trim();
              return `<p style="margin-bottom: 10px;">${sectionTitle} ${sectionContent}</p>`;
            })
            .join("")}
        </div>
      `,
      showCancelButton: true,
      confirmButtonText: "Yes, Clean",
      cancelButtonText: "No, Keep it",
      reverseButtons: true,
      width: "40vw",
      heightAuto: false,
      padding: "20px",
      customClass: {
        title: "text-lg font-semibold",
        confirmButton:
          "bg-red-600 hover:bg-blue-700 text-white px-4 py-2 rounded",
        cancelButton:
          "bg-gray-500 hover:bg-gray-300 text-gray-800 px-4 py-2 rounded",
      },
    });

    try {
      if (isConfirmed) {
        const cleanTableResponse = await cleanFile(table_name);
        if (cleanTableResponse.status === "cleaned") {
          Swal.fire("Data Cleaned!", "Your Data has been cleaned", "success");
          storeFilePreviews(cleanTableResponse);
          setUploadedFiles((prevUploaded) => [...prevUploaded, table_name]);
        }
      } else {
        const cancelResponse = await cancel_clean_file(table_name);
        if (cancelResponse.status !== "error") {
          storeFilePreviews(cancelResponse);
          setUploadedFiles((prevUploaded) => [...prevUploaded, table_name]);
          Swal.fire(
            "Skipped",
            "You chose to skip for now. Default table is stored",
            "info"
          );
        } else {
          throw new Error(cancelResponse.message || "Cancellation failed");
        }
      }
    } catch (error) {
      console.error(error);
      Swal.fire("Error", error.message, "error");
    }
  };

  useEffect(() => {
    if (cleaningSummary) {
      const timer = setTimeout(() => {
        ShowAlert();
        setCleaningSummary(null);
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [cleaningSummary]);

  const getPreviewByFileName = (fileName) => {
    const previewData = tablePreview[fileName] || [];

    if (previewData.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Preview Available",
        text: `No preview data found for ${fileName}.`,
        confirmButtonText: "OK",
      });
      return;
    }
    const tableHtml = `
    <div style="max-height: 400px; overflow-y: auto;">
      <table style="width: 100%; border-collapse: collapse; text-align: left;">
        <thead>
          <tr style="background-color: #007BFF; color: white;">
            ${Object.keys(previewData[0])
              .map(
                (key) =>
                  `<th style="padding: 8px; border: 1px solid #ddd;">${key}</th>`
              )
              .join("")}
          </tr>
        </thead>
        <tbody>
          ${previewData
            .map(
              (row) => `
                <tr>
                  ${Object.values(row)
                    .map(
                      (value) =>
                        `<td style="padding: 8px; border: 1px solid #ddd;">${value}</td>`
                    )
                    .join("")}
                </tr>`
            )
            .join("")}
        </tbody>
      </table>
    </div>
  `;
  Swal.fire({
    title: `Preview of ${fileName}`,
    html: tableHtml,
    width: "60vw",
    confirmButtonText: "Close",
    customClass: {
      popup: "rounded-lg shadow-lg",
    },
  });
};
const storeFilePreviews = (data) => {
  setTablePreview((prev) => ({
    ...prev,
    [data.table_name]: data.preview,
  }));
};

const handleRemoveFile = (indexToRemove) => {
  const fileToRemove = uploadedFiles[indexToRemove];
  Swal.fire({
    title: "Are you sure?",
    text: "You won't be able to revert this!",
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#3085d6",
    cancelButtonColor: "#d33",
    confirmButtonText: "Yes, remove it!",
  }).then((result) => {
    if (result.isConfirmed) {
      setUploadedFiles((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
      setSelectedFiles((prevFiles) =>
        prevFiles.filter((_, index) => index !== indexToRemove)
      );
      setTablePreview((prevPreview) => {
        if (!prevPreview || typeof prevPreview !== "object") {
          return {};
        }
        const updatedPreview = { ...prevPreview };
        delete updatedPreview[fileToRemove];
        return updatedPreview;
      });
    }
  });
};

  const handleFileUpload = (event) => {
    const files = Array.from(event.target.files );
    const newFiles = files.filter(
      (file) =>
        !uploadedFiles.includes(file.name) &&
        !selectedFiles.some((selected) => selected.name === file.name)
    );

    if (newFiles.length === 0) {
      setUploadStatus("error");
      setErrorMessage("Duplicate files are not allowed.");
      return;
    }

    setSelectedFiles((prevFiles) => [...prevFiles, ...newFiles]);
    
  };

  useEffect(() => {
    if (selectedFiles.length === 0) return;
    const uploadFiles = async () => {
      try {
        setUploadStatus("uploading");
        const data = await uploadFilesAPI(selectedFiles);
        setResponseData(data);
        setTablePreview((prevPreview) => ({
          ...prevPreview,
          ...data,
        }));
        setSelectedFiles([]);
        setUploadStatus(
          data.files.length !== selectedFiles.length ? "error" : "success"
        );
        if (data.files.length !== selectedFiles.length) {
          setErrorMessage("Some files were not uploaded successfully");
        }
      } catch (error) {
        setUploadStatus("error");
        setErrorMessage(error.message);
      } finally {
        setTimeout(() => setUploadStatus("idle"), 5000);
      }
    };
    uploadFiles();
  }, [selectedFiles]);
    
  useEffect(() => {
    if (responseData?.files?.[0]?.cleaning_summary) {
      setCleaningSummary(responseData.files[0].cleaning_summary);
    }
  }, [responseData, setCleaningSummary]);

  const renderUploadStatus = () => {
    const statusMessages = {
      idle: "",
      uploading: "Uploading...",
      success: "Files uploaded successfully!",
      error: `Error: ${errorMessage}`,
    };
    const textColor = {
      idle: "text-gray-800",
      uploading: "text-blue-500 animate-pulse",
      success: "text-green-500",
      error: "text-red-500",
    };
    return (
      <div className="flex items-center justify-center space-x-2 mt-4">
       <p className={`${textColor[uploadStatus]} text-lg font-semibold`}>
        {statusMessages[uploadStatus]}
      </p>
      </div>
    );
  };



  return (
    <div className="w-full max-w-xl mx-auto px-4 py-8 bg-white rounded-2xl shadow-2xl">
      <div className="group w-full border-2 border-dashed border-gray-300 rounded-xl p-8 text-center cursor-pointer hover:border-blue-500 transition-all duration-300 hover:bg-blue-50/50">
     
        <input type="file" 
           multiple
         className="hidden"
          onChange={handleFileUpload}
           accept=".csv,.xlsx" />
       
        <div className="flex flex-col items-center">
          <FileSpreadsheet className="w-16 h-16 text-blue-500 group-hover:text-blue-600 transition-colors mb-4" />
          <h2 className="text-xl font-semibold text-gray-800 mb-2 group-hover:text-blue-600">Drop your files here</h2>
          <p className="text-sm text-gray-500 mb-4">or <span className="text-blue-500 underline">browse</span> to upload</p>
          <div className="text-xs text-gray-400 bg-gray-100 px-3 py-1 rounded-full">Supported: CSV, XLSX (Max 200MB)</div>
         
        </div>
      </div>

      {renderUploadStatus()}

      <div className="mt-4">
        <p className="text-sm text-gray-600">
          {uploadedFiles?.length} file(s) uploaded
        </p>
        {renderUploadStatus()}
        <div className="mt-4 w-full max-w-lg mx-auto">
          <h2 className="text-2xl font-semibold text-gray-800 mb-3">
            Uploaded Files
          </h2>

          <div className="w-full shadow-md rounded-lg border p-3 flex flex-wrap gap-3 max-h-[20vh] overflow-y-auto scrollbar-thin bg-white scrollbar-thumb-gray-400 scrollbar-track-gray-200">
            {uploadedFiles.length === 0 ? (
              <p className="text-gray-800 text-lg font-semibold">
                No files selected
              </p>
            ) : (
              uploadedFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex items-center bg-gray-200 px-3 py-2 rounded-lg border border-gray-400 shadow-sm"
                >
                  <span className="text-gray-700 font-medium">{file}</span>
                  <button
                    onClick={() => handleRemoveFile(index)}
                    className="ml-3 text-red-500 hover:text-red-700"
                  >
                    <X className="h-5 w-5" />
                  </button>
                </div>
              ))
            )}
          </div>

          <div className="" ref={dropdownRef}>
            <Dropdown
              options={uploadedFiles.map((file) => file)}
              defaultValue="Table Preview"
              label="Table Preview of Files"
              onSelect={getPreviewByFileName}
            />
          </div>

          <div className="mt-4">
            <p className="text-gray-500 font-mono">
              Easily connect your data via a database or Excel sheet.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ExcelDropBox;
