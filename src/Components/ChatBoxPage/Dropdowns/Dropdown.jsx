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
    <div 
    className="
      relative 
      w-full 
      max-w-md 
      mx-auto
    " 
    ref={dropdownRef}
  >
    {label && (
      <label 
        className="
          text-xl 
          sm:text-2xl 
          font-medium 
          text-black
          
          block
          text-center

        "
      >
        {label}
      </label>
    )}
    
    {/* Dropdown Trigger */}
    <div 
      className="
        bg-white 
        border 
        border-gray-300 
        rounded-lg 
        shadow-md 
        p-2 
        sm:p-3 
        flex 
        justify-between 
        items-center 
        cursor-pointer 
        text-gray-800 
        font-medium 
        hover:bg-gray-50 
        transition-all 
        duration-200 
        px-3 
        sm:px-4
      "
      onClick={() => setIsOpen(!isOpen)}
    >
      <span 
        className="
          truncate 
          text-sm 
          sm:text-base 
          max-w-[80%]
        "
      >
        {selected}
      </span>
      
      <span 
        className={`
          transition-transform 
          duration-300 
          ${isOpen ? "rotate-180" : ""}
        `}
      >
        <ArrowDropDownIcon 
          className="
            text-gray-600 
            text-base 
            sm:text-lg
          " 
        />
      </span>
    </div>
    
    {/* Dropdown Options */}
    {isOpen && (
      <ul 
        className="
          absolute 
          z-50 
          left-0 
          mt-2 
          w-full 
          max-h-56 
          
          bg-white 
          text-gray-900 
          font-medium 
          rounded-lg 
          shadow-lg 
          border 
          border-gray-300 
          transition-all 
          duration-300
          overflow-y-scroll scrollbar-hide
        "
      >
        {options.map((option, index) => (
          <li
            key={index}
            className="
              px-3 
              sm:px-4 
              py-2 
              sm:py-3 
              cursor-pointer 
              hover:bg-blue-500 
              hover:text-white 
              transition-all 
              duration-200 
              text-gray-700 
              text-sm 
              sm:text-base
            "
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
