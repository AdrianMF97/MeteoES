import { useState, useMemo, useEffect, useRef } from "react";
import municipalities from "./utils/spain_municipalities.json";

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");
  const [showSuggestions, setShowSuggestions] = useState(false);
  const containerRef = useRef(null);

  // Normalizamos para la búsqueda insensible a tildes
  const normalize = (str) =>
    str
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase();

  //useMemo para evita renderizados en cascada
  const filteredSuggestions = useMemo(() => {
    const trimmedQuery = query.trim();
    //Filtramos a partir de 3 caracteres y evitamos búsquedas numéricas
    if (trimmedQuery.length < 3 || /^\d+$/.test(trimmedQuery)) {
      return [];
    }

    const searchTarget = normalize(trimmedQuery);

    return municipalities
      .filter((m) => normalize(m.name).includes(searchTarget))
      .slice(0, 5);
  }, [query]);

  // Manejo de clics para cerrar el menú
  useEffect(() => {
    const handleClickOutside = (e) => {
      if (containerRef.current && !containerRef.current.contains(e.target)) {
        setShowSuggestions(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleSelect = (m) => {
    setQuery(m.name);
    setShowSuggestions(false);
    onSearch(m.ine_code);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const value = query.trim();
    if (!value) return;

    if (/^\d{5}$/.test(value)) {
      onSearch(value);
      setShowSuggestions(false);
    } else {
      const encontrado = municipalities.find(
        (m) => normalize(m.name) === normalize(value),
      );
      if (encontrado) {
        onSearch(encontrado.ine_code);
        setShowSuggestions(false);
      }
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4 relative" ref={containerRef}>
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-gray-500 dark:text-gray-400 font-bold text-[10px] tracking-[0.2em] uppercase ml-1">
          Búsqueda por municipio o código INE
        </label>

        <div className="flex gap-2 p-1.5 bg-white dark:bg-gray-800 rounded-4xl shadow-lg border border-gray-100 dark:border-gray-700 focus-within:ring-2 focus-within:ring-blue-500/20 focus-within:border-blue-500 transition-all duration-300">
          <input
            type="text"
            placeholder="Ej: Madrid o 28079"
            value={query}
            onChange={(e) => {
              setQuery(e.target.value);
              setShowSuggestions(true);
            }}
            onFocus={() => setShowSuggestions(true)}
            className="flex-1 px-5 bg-transparent text-gray-800 dark:text-white focus:outline-none font-medium placeholder:text-gray-400 dark:placeholder:text-gray-600"
          />

          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-full transition-all active:scale-95 shadow-md shadow-blue-200 dark:shadow-none text-xs tracking-widest cursor-pointer"
          >
            BUSCAR
          </button>
        </div>

        {showSuggestions && filteredSuggestions.length > 0 && (
          <ul className="absolute z-50 top-22 left-6 right-6 bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700 overflow-hidden animate-in fade-in zoom-in-95 duration-200">
            {filteredSuggestions.map((m) => (
              <li
                key={m.ine_code}
                onClick={() => handleSelect(m)}
                className="px-6 py-3 hover:bg-blue-50 dark:hover:bg-blue-900/20 text-gray-700 dark:text-gray-200 cursor-pointer flex justify-between items-center group transition-colors"
              >
                <span className="font-medium">{m.name}</span>
                <span className="text-[11px] text-gray-400 group-hover:text-blue-500 ">
                  {m.ine_code}
                </span>
              </li>
            ))}
          </ul>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
