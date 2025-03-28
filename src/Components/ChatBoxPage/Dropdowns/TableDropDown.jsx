import { useState, useEffect, useRef } from "react";
import { Search, ChevronDown, Check } from "lucide-react";

const TableDropdown = ({ DbResponse, selectedTable, handleTableSelection }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const dropdownRef = useRef(null);
  const inputRef = useRef(null);

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

  // Focus input when dropdown opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  return (
    <div 
      className="
        relative 
        w-full 
        max-w-md 
        mx-auto
      " 
      ref={dropdownRef}
    >
      {/* Input Field with Search Icon and Dropdown Toggle */}
      <div 
        className="
          flex 
          items-center 
          border 
          border-gray-300 
          bg-white 
          rounded-xl 
          shadow-sm 
          hover:shadow-md 
          transition-all 
          duration-300 
          ease-in-out
          p-2 
          sm:p-3 
          group
        "
        onClick={() => setIsOpen((prev) => !prev)}
      >
        <Search 
          className="
            text-gray-500 
            mr-2 
            w-5 
            h-5 
            sm:w-6 
            sm:h-6 
            group-hover:text-blue-500 
            transition-colors
          " 
        />
        
        <input
          ref={inputRef}
          type="text"
          placeholder="Search or select a table..."
          className="
            w-full 
            outline-none 
            text-gray-800 
            text-sm 
            sm:text-base 
            placeholder-gray-500 
            bg-transparent
            group-hover:placeholder-blue-500 
            transition-colors
          "
          value={searchQuery}
          onChange={(e) => {
            setSearchQuery(e.target.value);
            setIsOpen(true);
          }}
          onFocus={() => setIsOpen(true)}
          onClick={(e) => e.stopPropagation()}
        />
        
        <ChevronDown
          className={`
            text-gray-500 
            w-5 
            h-5 
            sm:w-6 
            sm:h-6 
            transition-transform 
            duration-300 
            group-hover:text-blue-500
            ${isOpen ? "rotate-180 text-blue-500" : ""}
          `}
        />
      </div>

      {/* Dropdown Options */}
      {isOpen && (
        <div 
          className="
            absolute 
            w-full 
            mt-2 
            bg-white 
            border 
            border-gray-300 
            rounded-xl 
            shadow-lg 
            max-h-60 
            overflow-y-scroll
            oveerflow-x-hidden
            scrollbar-hide
            z-50 
            animate-fadeIn
            scrollbar-hide
          "
        >
          {filteredTables.length > 0 ? (
            filteredTables.map((table) => (
              <div
                key={table}
                className="
                  flex 
                  items-center 
                  justify-between 
                  gap-2 
                  p-2 
                  sm:p-3 
                  border-b 
                  border-gray-200
                  last:border-none 
                  bg-white 
                  hover:bg-blue-50
                  transition 
                  duration-300 
                  cursor-pointer
                  group
                "
                onClick={() => handleTableSelection(table)}
              >
                <span 
                  className="
                    text-sm 
                    sm:text-base 
                    font-medium 
                    text-gray-800 
                    truncate 
                    w-full 
                    max-w-[15rem] 
                    overflow-hidden
                  "
                >
                  {table}
                </span>
                
                {selectedTable.includes(table) && (
                  <Check 
                    className="
                      w-5 
                      h-5 
                      text-blue-600 
                      opacity-0 
                      group-hover:opacity-100 
                      transition-opacity
                    " 
                  />
                )}
              </div>
            ))
          ) : (
            <p 
              className="
                p-2 
                sm:p-3 
                text-sm 
                sm:text-base 
                text-gray-500 
                text-center
                italic
              "
            >
              No tables found
            </p>
          )}
        </div>
      )}
    </div>
  );
};

export default TableDropdown;