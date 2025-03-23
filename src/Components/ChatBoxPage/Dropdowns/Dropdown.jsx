import { useState, useRef, useEffect } from "react";
import ArrowDropDownIcon from "@mui/icons-material/ArrowDropDown";

const Dropdown = ({ options, label, onSelect, defaultValue }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState(defaultValue || options[0]);
  const dropdownRef = useRef(null);

  const handleSelect = (option) => {
    setSelected(option);
    setIsOpen(false);
    if (onSelect) onSelect(option);
  };

  useEffect(() => {
    if (!options.includes(selected)) {
      setSelected(defaultValue);
    }
  }, [options, selected, defaultValue]);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="relative w-[20rem]" ref={dropdownRef}>
      {label && (
        <label className="text-2xl font-medium text-gray-800 mb-2 block">
          {label}
        </label>
      )}

      <div
        className="bg-white border border-gray-300 rounded-lg shadow-md p-3 flex justify-between items-center cursor-pointer text-gray-800 font-medium hover:bg-gray-50 transition-all duration-200 px-4"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className="truncate">{selected}</span>
        <span
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <ArrowDropDownIcon className="text-gray-600" />
        </span>
      </div>

      {isOpen && (
        <ul className="absolute left-0 mt-2 w-full max-h-56 overflow-y-auto bg-white text-gray-900 font-medium rounded-lg shadow-lg border border-gray-300 transition-all duration-300">
          {options.map((option, index) => (
            <li
              key={index}
              className="px-4 py-3 cursor-pointer hover:bg-blue-500 hover:text-white transition-all duration-200 text-gray-700"
              onClick={() => handleSelect(option)}
            >
              {option}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default Dropdown;
