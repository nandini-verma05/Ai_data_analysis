import { useState, useEffect, useRef } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";
import SearchIcon from "@mui/icons-material/Search";

const TableDropdown = ({ DbResponse, selectedTable, handleTableSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);

  // Filter tables based on search input
  const filteredTables = (DbResponse?.tables || []).filter((table) =>
    table.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="relative w-[20rem] max-w-lg mx-auto" ref={dropdownRef}>
      {/* Input Field with Search Icon and Dropdown Toggle */}
      <div
        className="flex border items-center border-gray-300 bg-white rounded-lg shadow-md p-3 cursor-pointer"
        onClick={() => setIsOpen((prev) => !prev)} // Toggle dropdown
      >
        <SearchIcon className="text-gray-500" />
        <input
          type="text"
          placeholder="Search or select a table..."
          className="w-full outline-none text-gray-800"
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
        />
        <ArrowDropDownIcon
          className={`text-gray-500 transition-transform cursor-pointer ${
            isOpen ? "rotate-180" : ""
          }`}
        />
      </div>

      {isOpen && (
        <div className="absolute w-full mt-2 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto z-50 animate-fadeIn">
          {filteredTables.length > 0 ? (
            filteredTables.map((table) => (
              <label
                key={table}
                className="flex items-center gap-2 p-3 border-b border-gray-200 
                           last:border-none bg-white hover:bg-blue-50 
                           transition duration-300 cursor-pointer"
              >
                <input
                  type="checkbox"
                  value={table}
                  checked={selectedTable.includes(table)}
                  onChange={() => handleTableSelection(table)}
                  className="w-5 h-5 text-blue-600 border-gray-400 rounded"
                />
                <span className="text-lg font-medium text-gray-800 truncate w-full max-w-[15rem] overflow-hidden">
                  {table}
                </span>
              </label>
            ))
          ) : (
            <p className="p-3 text-gray-500 text-center">No tables found</p>
          )}
        </div>
      )}
    </div>
  );
};

export default TableDropdown;
