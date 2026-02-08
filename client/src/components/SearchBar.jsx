import { useState, useMemo, useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import municipalities from "./utils/spain_municipalities.json";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState({
    top: 0,
    left: 0,
    width: 0,
  });

  const containerRef = useRef(null);
  const inputContainerRef = useRef(null);
  const dropdownRef = useRef(null);

  const normalize = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  const filteredSuggestions = useMemo(() => {
    const trimmedQuery = query.trim();

    if (trimmedQuery.length < 3 || /^\d+$/.test(trimmedQuery)) {
      return [];
    }

    const searchTarget = normalize(trimmedQuery);

    return municipalities
      .filter((m) => normalize(m.name).includes(searchTarget))
      .slice(0, 5);
  }, [query]);

  useEffect(() => {
    if (showSuggestions && inputContainerRef.current) {
      const rect = inputContainerRef.current.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY + 8,
        left: rect.left + window.scrollX + 8,
        width: rect.width - 16,
      });
    }
  }, [showSuggestions, query]);

  useEffect(() => {
    const handleClickOutside = (e) => {
      const isOutsideContainer =
        containerRef.current && !containerRef.current.contains(e.target);
      const isOutsideDropdown =
        dropdownRef.current && !dropdownRef.current.contains(e.target);

      if (isOutsideContainer && isOutsideDropdown) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (municipality) => {
    setQuery(municipality.name);
    setShowSuggestions(false);
    onSearch(municipality.ine_code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = query.trim();

    if (!value) return;

    if (/^\d{5}$/.test(value)) {
      onSearch(value);
      setShowSuggestions(false);
      return;
    }

    const foundMunicipality = municipalities.find(
      (m) => normalize(m.name) === normalize(value),
    );

    if (foundMunicipality) {
      onSearch(foundMunicipality.ine_code);
      setShowSuggestions(false);
    }
  };

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    setShowSuggestions(true);
  };

  const handleInputFocus = () => {
    setShowSuggestions(true);
  };

  return (
    <>
      <div className="max-w-md mx-auto mt-8 px-4" ref={containerRef}>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <label className="text-gray-500 dark:text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase ml-1">
            Búsqueda por municipio o código INE
          </label>

          <div
            ref={inputContainerRef}
            className="flex flex-col md:flex-row gap-2 p-1.5 bg-white dark:bg-gray-800 rounded-3xl md:rounded-4xl shadow-lg border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-300 relative z-20"
          >
            <input
              type="text"
              placeholder="Ej: Madrid o 28079"
              value={query}
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              className="flex-1 px-5 py-3 md:py-0 bg-transparent text-gray-800 dark:text-white focus:outline-none font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
            />

            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-black py-4 md:py-3 px-8 rounded-2xl md:rounded-full transition-all active:scale-95 shadow-md shadow-blue-200 dark:shadow-none text-xs tracking-widest cursor-pointer"
            >
              BUSCAR
            </button>
          </div>
        </form>
      </div>

      {showSuggestions &&
        filteredSuggestions.length > 0 &&
        createPortal(
          <ul
            ref={dropdownRef}
            style={{
              position: "absolute",
              top: `${dropdownPosition.top}px`,
              left: `${dropdownPosition.left}px`,
              width: `${dropdownPosition.width}px`,
            }}
            className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden z-9999"
          >
            {filteredSuggestions.map((municipality) => (
              <li
                key={municipality.ine_code}
                onClick={() => handleSelect(municipality)}
                className="px-6 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 cursor-pointer flex justify-between items-center group transition-colors"
              >
                <span className="font-medium">{municipality.name}</span>
                <span className="text-[11px] text-gray-400 group-hover:text-blue-500 font-mono">
                  {municipality.ine_code}
                </span>
              </li>
            ))}
          </ul>,
          document.body,
        )}
    </>
  );
};

export default SearchBar;
