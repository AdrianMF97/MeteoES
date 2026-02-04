import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import MapBackground from "./components/MapBackground";
import WeatherCard from "./components/WeatherCard";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    darkMode
      ? document.documentElement.classList.add("dark")
      : document.documentElement.classList.remove("dark");
  }, [darkMode]);

  const handleSearch = async (codigo) => {
    setLoading(true);
    setError(null);
    setWeatherData(null);

    try {
      const response = await fetch(`/api/tiempo/${codigo}`);
      const result = await response.json();
      if (result.success && result.data && result.data.length > 0) {
        setWeatherData(result.data[0]);
      } else {
        throw new Error("No se encontraron datos para ese código");
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen transition-colors duration-500 overflow-x-hidden">
      <MapBackground darkMode={darkMode} />
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="container mx-auto px-4 py-12">
        <div className="max-w-4xl mx-auto">
          <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-[2.5rem] border border-gray-200 dark:border-gray-800 overflow-hidden">
            <div className="bg-gray-50/50 dark:bg-gray-800/50 p-10 text-center border-b border-gray-100 dark:border-gray-800">
              <h2 className="text-4xl md:text-5xl font-black mb-3 text-gray-800 dark:text-white tracking-tight">
                Predicción Meteorológica
              </h2>
              <p className="text-gray-500 dark:text-gray-400 text-lg">
                Introduce el código INE del municipio
              </p>
            </div>

            <div className="p-10">
              <SearchBar onSearch={handleSearch} />

              {/* Resultados */}
              <div className="mt-12">
                {loading && (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-2xl text-center text-red-600 dark:text-red-400 font-medium">
                    <span className="text-2xl mr-2">⚠️</span> {error}
                  </div>
                )}

                {weatherData && (
                  <div className="mt-12">
                    <WeatherCard data={weatherData} />
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default App;
