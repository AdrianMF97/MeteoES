import CurrentWeather from "./weather_components/CurrentWeather";
import WeatherDetails from "./weather_components/WeatherDetails";
import ForecastRow from "./weather_components/ForecastRow";
import { getWeatherIcon } from "./utils/weatherUtils";

const WeatherCard = ({ data }) => {
  if (!data || !data.prediccion) return null;

  const dias = data.prediccion.dia;
  const hoy = dias[0];
  const municipio = data.nombre;
  const provincia = data.provincia;
  const descripcion = hoy.estadoCielo.find((c) => c.descripcion)?.descripcion;

  const icono = getWeatherIcon(descripcion);

  return (
    <div className="animate-in fade-in slide-in-from-bottom-8 duration-700 w-full">
      {/* Tarjeta principal */}
      <div className="bg-white dark:bg-gray-800 rounded-[2.5rem] shadow-xl shadow-gray-200/50 dark:shadow-none border border-gray-100 dark:border-gray-700 overflow-hidden mb-6">
        <CurrentWeather
          municipio={municipio}
          provincia={provincia}
          hoy={hoy}
          icono={icono}
          descripcion={descripcion}
        />
        <WeatherDetails hoy={hoy} />
        {console.log(hoy)}
      </div>

      {/* Predicción semanal */}
      <ForecastRow dias={dias.slice(1, 6)} />
    </div>
  );
};

export default WeatherCard;
