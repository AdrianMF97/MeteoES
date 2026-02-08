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

  const API_BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

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
      const response = await fetch(`${API_BASE_URL}/api/tiempo/${codigo}`);
      const result = await response.json();
      if (result.success && result.data && result.data.length > 0) {
        setWeatherData(result.data[0]);
      } else {
        throw new Error("Municipio no encontrado");
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
      <main className="container mx-auto px-4 py-8 md:py-16 relative z-10">
        <div className="max-w-5xl mx-auto">
          <div className="bg-gray-50/80 dark:bg-gray-900/80 backdrop-blur-xl rounded-[3rem] border border-white/50 dark:border-gray-800/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] dark:shadow-[0_8px_30px_rgb(0,0,0,0.2)] overflow-hidden transition-all duration-500">
            <div className="text-center pt-12 pb-6 px-6">
              <h2 className="text-3xl md:text-4xl font-black text-gray-800 dark:text-white tracking-tight mb-2">
                Predicción Meteorológica
              </h2>
              <p className="text-gray-500 dark:text-gray-300 font-medium">
                Datos oficiales de AEMET
              </p>
            </div>

            <div className="px-6 md:px-12 pb-12">
              <SearchBar onSearch={handleSearch} />

              {/* Resultados */}
              <div className="mt-10">
                {loading && (
                  <div className="flex justify-center py-10">
                    <div className="animate-spin rounded-full h-14 w-14 border-t-4 border-b-4 border-blue-600"></div>
                  </div>
                )}

                {error && (
                  <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 p-6 rounded-2xl text-center text-red-600 dark:text-red-400 font-medium">
                    {error}
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
