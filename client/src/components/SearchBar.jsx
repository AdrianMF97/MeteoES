import React, { useState } from "react";

const SearchBar = ({ onSearch }) => {
  const [codigo, setCodigo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validación simple: deben ser 5 números
    if (!/^\d{5}$/.test(codigo)) {
      setError("El código debe tener 5 dígitos numéricos.");
      return;
    }

    setError("");
    onSearch(codigo);
  };

  return (
    <div className="max-w-md mx-auto mt-8 px-4">
      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
        <label className="text-gray-700 dark:text-gray-200 font-medium">
          Buscar por código de municipio:
        </label>

        <div className="flex gap-2">
          <input
            type="text"
            placeholder="Ej: 28079 (Madrid)"
            value={codigo}
            onChange={(e) => setCodigo(e.target.value)}
            className="flex-1 p-3 rounded-lg border border-gray-300 dark:border-gray-600 bg-white dark:bg-gray-700 text-gray-800 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors"
          />
          <button
            type="submit"
            className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg transition-colors"
          >
            Buscar
          </button>
        </div>

        {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
      </form>
    </div>
  );
};

export default SearchBar;
