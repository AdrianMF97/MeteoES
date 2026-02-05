import { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!/^\d{5}$/.test(codigo)) {
      setError("El código debe tener 5 dígitos numéricos.");
      return;
    }
    setError("");
    onSearch(codigo);
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-3">
        <label className="text-gray-500 dark:text-gray-400 font-bold text-xs tracking-wide uppercase ml-1">
          Código de municipio
        </label>

        <div className="flex gap-2 p-1.5 bg-white dark:bg-gray-800 rounded-4xl shadow-lg shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700">
          <input
            type="text"
            placeholder="Ej: 28079"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="flex-1 px-5 bg-transparent text-gray-800 dark:text-white focus:outline-none font-medium"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-black py-3 px-8 rounded-full transition-all active:scale-95 cursor-pointer shadow-md shadow-blue-200 dark:shadow-none"
          >
            BUSCAR
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-[11px] font-bold uppercase ml-4 ">
            {error}
          </p>
        )}
      </form>
    </div>
  );
};

export default SearchBar;
