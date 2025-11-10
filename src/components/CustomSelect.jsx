"use client";

import { useState, useRef, useEffect } from "react";
import { ChevronDown } from "lucide-react";

export default function CustomSelect({
  options = [],
  value,
  onChange,
  placeholder = "Select option",
  icon: Icon,
  disabled = false,
  error,
  className = "",
}) {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (optionValue) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  const selectedOption = options.find((opt) => opt.value === value);

  return (
    <div ref={dropdownRef} className="relative">
      {/* Select Button */}
      <button
        type="button"
        disabled={disabled}
        onClick={() => !disabled && setIsOpen(!isOpen)}
        className={`w-full pl-10 pr-10 p-2 border border-gray-300 rounded-lg bg-gray-50 
          focus:ring-2 focus:ring-blue-500 outline-none text-left relative
          ${disabled ? "bg-gray-100 cursor-not-allowed" : "cursor-pointer hover:border-blue-400"}
          ${className}`}
      >
        {Icon && (
          <Icon className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" size={18} />
        )}
        
        <span className={`block truncate ${selectedOption ? "text-gray-700" : "text-gray-400"}`}>
          {selectedOption ? selectedOption.label : placeholder}
        </span>

        <ChevronDown
          className={`absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 transition-transform duration-200 pointer-events-none
            ${isOpen ? "rotate-180" : ""}`}
          size={18}
        />
      </button>

      {/* Dropdown Menu */}
      {isOpen && !disabled && (
        <div className="absolute z-50 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-auto">
          {options.map((option) => (
            <div
              key={option.value}
              onClick={() => handleSelect(option.value)}
              className={`px-4 py-2.5 cursor-pointer transition-colors
                ${
                  value === option.value
                    ? "bg-blue-50 text-blue-700 font-medium"
                    : "text-gray-700 hover:bg-gray-100"
                }
                ${option.disabled ? "opacity-50 cursor-not-allowed" : ""}
              `}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}

      {/* Error Message */}
      {error && <p className="text-red-500 text-xs mt-1">{error}</p>}
    </div>
  );
}
