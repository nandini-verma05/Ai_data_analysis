import { React, useState, useEffect, useRef } from "react";
import TableDropdown from "../Dropdowns/TableDropDown";
import { loadTablesApi } from "../../../Api";
import Swal from "sweetalert2";
import Dropdown from "../Dropdowns/Dropdown";

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
      });
      return;
    }

    const tableHtml = `
      <div style="max-height: 400px; max-width: 80vw; overflow-x: auto; overflow-y: auto; border-radius: 8px; padding: 10px; background: #f8f9fa;">
        <table style="width: max-content; border-collapse: collapse; text-align: left; font-family: Arial, sans-serif; font-size: 14px;">
          <thead style="position: sticky; top: 0; background-color: #004085; color: white; z-index: 1;">
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
                    index % 2 === 0 ? "#ffffff" : "#f2f2f2"
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
        popup: "rounded-lg shadow-lg",
      },
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
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, remove it!",
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
    <div className="pt-2 bg-gray-100 w-full max-w-full mt-5">
      <h2 className="text-2xl font-bold text-blue-700 mb-2 text-center">
        Database Tables
      </h2>
      <TableDropdown
        DbResponse={DbResponse || { tables: [] }}
        selectedTable={selectedTable}
        handleTableSelection={handleTableSelection}
      />
      <div className="w-[20rem] mt-10">
        <div
          className={`w-full shadow-lg rounded-lg border border-gray-300 p-3 flex flex-wrap gap-3 ${
            LoadedTable.length > 4
              ? "max-h-[25vh] overflow-y-auto"
              : "max-h-fit"
          }`}
        >
          {LoadedTable.length === 0 ? (
            <p className="text-gray-800 text-lg font-semibold">
              No Tables Loaded
            </p>
          ) : (
            LoadedTable.map((file, index) => (
              <div
                key={index}
                className="flex items-center bg-gray-200 px-3 py-2 rounded-lg border border-gray-400 shadow-sm"
              >
                <span className="text-gray-700 font-medium">{file}</span>
                <button
                  onClick={() => handleRemoveTable(index)}
                  className="ml-3 text-red-500 hover:text-red-700"
                >
                  ✕
                </button>
              </div>
            ))
          )}
        </div>
        <div className="mt-10" ref={dropdownRef}>
          <Dropdown
            options={LoadedTable}
            defaultValue="Table Preview"
            label="Table Previews"
            onSelect={getPreviewByFileName}
          />
        </div>
      </div>
    </div>
  );
};

export default DbSlider;
