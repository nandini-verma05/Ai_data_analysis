import { React, useState, useEffect, useRef } from "react";
import TableDropdown from "../Dropdowns/TableDropDown";
import { loadTablesApi } from "../../../Api";
import Swal from "sweetalert2";
import Dropdown from "../Dropdowns/Dropdown";
import { Database, X, FileText } from "lucide-react";

const DbSlider = ({ DbResponse }) => {
  const [selectedTable, setSelectedTable] = useState([]);
  const [LoadedTable, setLoadedTable] = useState([]);
  const [tablePreview, setTablePreview] = useState({});

  const dropdownRef = useRef(null);

  const getPreviewByFileName = (fileName) => {
    const previewData = tablePreview[fileName] || [];

    if (previewData.length === 0) {
      Swal.fire({
        icon: "error",
        title: "No Preview Available",
        text: `No preview data found for ${fileName}.`,
        confirmButtonText: "OK",
        customClass: {
          popup: 'rounded-xl',
          confirmButton: 'bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2'
        }
      });
      return;
    }

    const tableHtml = `
      <div style="max-height: 400px; max-width: 80vw; overflow-x: auto; overflow-y-scroll scrollbar-hide; border-radius: 12px; padding: 10px; background: #f8f9fa;">
        <table style="width: max-content; border-collapse: collapse; text-align: left; font-family: Arial, sans-serif; font-size: 14px;">
          <thead style="position: sticky; top: 0; background-color: #2563eb; color: white; z-index: 1;">
            <tr>
              ${Object.keys(previewData[0])
                .map(
                  (key) =>
                    `<th style="padding: 12px; border: 1px solid #ddd; font-weight: bold; text-transform: capitalize; min-width: 150px; white-space: nowrap;">${key}</th>`
                )
                .join("")}
            </tr>
          </thead>
          <tbody>
            ${previewData
              .map(
                (row, index) => `
                  <tr style="background-color: ${
                    index % 2 === 0 ? "#ffffff" : "#f3f4f6"
                  }; transition: background 0.3s;">
                    ${Object.values(row)
                      .map(
                        (value) =>
                          `<td style="padding: 10px; border: 1px solid #ddd; min-width: 150px; white-space: nowrap;">${value}</td>`
                      )
                      .join("")}
                  </tr>`
              )
              .join("")}
          </tbody>
        </table>
      </div>`;

    Swal.fire({
      title: `Preview of ${fileName}`,
      html: tableHtml,
      width: "80vw",
      confirmButtonText: "Close",
      customClass: {
        popup: "rounded-xl shadow-2xl",
        title: "text-xl font-bold text-blue-700",
        confirmButton: 'bg-blue-600 hover:bg-blue-700 rounded-lg px-4 py-2 transition-colors'
      }
    });
  };

  useEffect(() => {
    const loadTables = async () => {
      if (Array.isArray(selectedTable) && selectedTable.length > 0) {
        const response = await loadTablesApi(selectedTable);
        if (response) {
          setLoadedTable(response.tables || []);
          setTablePreview((prev) => ({
            ...prev,
            ...response.previews,
          }));
        }
      } else {
        setLoadedTable([]);
      }
    };
    loadTables();
  }, [selectedTable]);

  const handleRemoveTable = (indexToRemove) => {
    const fileToRemove = LoadedTable[indexToRemove];
    Swal.fire({
      title: "Remove Table",
      text: "Are you sure you want to remove this table?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Remove",
      cancelButtonText: "Cancel",
      customClass: {
        popup: 'rounded-xl',
        confirmButton: 'bg-red-600 hover:bg-red-700 rounded-lg px-4 py-2',
        cancelButton: 'bg-gray-200 text-gray-800 hover:bg-gray-300 rounded-lg px-4 py-2'
      }
    }).then((result) => {
      if (result.isConfirmed) {
        setLoadedTable((prev) =>
          prev.filter((_, index) => index !== indexToRemove)
        );
        setSelectedTable((prev) =>
          prev.filter((_, index) => index !== indexToRemove)
        );
        setTablePreview((prev) => {
          const updatedPreview = { ...prev };
          delete updatedPreview[fileToRemove];
          return updatedPreview;
        });
      }
    });
  };

  const handleTableSelection = (table) => {
    setSelectedTable((prev) =>
      prev.includes(table) ? prev.filter((t) => t !== table) : [...prev, table]
    );
  };

  return (
      <div className="max-w-4xl mx-auto mt-4 bg-white rounded-xl shadow-2xl p-6 sm:p-8 transform transition-all duration-300 hover:shadow-3xl">
        <div className="flex items-center justify-center mb-6">
          <Database className="w-10 h-10 text-purple-600 mr-3" />
          <h2 className="
            text-2xl 
            sm:text-3xl 
            font-bold 
            text-purple-700 
            tracking-tight
          ">
            Database Tables
          </h2>
        </div>

        <div className="w-full max-w-md mx-auto">
          <TableDropdown
            DbResponse={DbResponse || { tables: [] }}
            selectedTable={selectedTable}
            handleTableSelection={handleTableSelection}
          />

          {/* Loaded Tables Container */}
          <div className="w-full mt-6 sm:mt-10">
            <div 
              className={`
                w-full 
                bg-white 
                shadow-lg 
                rounded-xl 
                border 
                border-gray-200 
                p-4 
                flex 
                flex-wrap 
                gap-2 
                sm:gap-3 
                ${LoadedTable.length > 4 
                  ? "max-h-[55vh] overflow-y-auto scrollbar-hide" 
                  : "max-h- content"
                }
              `}
            >
              {LoadedTable.length === 0 ? (
                <div className="
                  flex 
                  flex-col 
                  items-center 
                  justify-center 
                  w-full 
                  py-6 
                  text-gray-500
                ">
                  <FileText className="w-12 h-12 mb-3 opacity-50" />
                  <p className="
                    text-base 
                    sm:text-lg 
                    font-medium 
                    text-center
                  ">
                    No Tables Loaded
                  </p>
                </div>
              ) : (
                LoadedTable.map((file, index) => (
                  <div
                    key={index}
                    className="
                      flex 
                      items-center 
                      bg-blue-50 
                      px-3 
                      py-2 
                      rounded-lg 
                      border 
                      border-black-200 
                      shadow-sm
                      max-w-full
                      group
                      transition
                      hover:bg-blue-100
                    "
                  >
                    <span className="
                      text-blue-800 
                      font-medium 
                      text-sm 
                      sm:text-base 
                      truncate
                      max-w-[200px]
                      mr-2
                    ">
                      {file}
                    </span>
                    <button
                      onClick={() => handleRemoveTable(index)}
                      className="
                        text-red-500 
                        hover:text-red-700 
                        opacity-0 
                        group-hover:opacity-100 
                        transition-all 
                        duration-300
                      "
                    >
                      <X className="w-5 h-5" />
                    </button>
                  </div>
                ))
              )}
            </div>

            {/* Table Preview Dropdown */}
            <div className="mt-6 sm:mt-10 mb-5" ref={dropdownRef}>
              <Dropdown
                options={LoadedTable}
                defaultValue="Table Preview"
                label="Table Previews"
                onSelect={getPreviewByFileName}
              />
            </div>
          </div>
        </div>
      </div>
    // </div>
  );
};

export default DbSlider;