import { getHourlyEvolution } from "./weatherUtils";

const CurrentWeather = ({ municipio, provincia, hoy, icono, descripcion }) => {
  if (!hoy || !hoy.temperatura) return null;

  const evolucion = getHourlyEvolution(hoy);

  return (
    <div className="flex flex-col lg:flex-row justify-between items-center p-8 md:p-10 gap-10">
      {/* Localidad y tiempo actual */}
      <div className="text-center lg:text-left space-y-3 flex-1">
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 text-[10px] font-black uppercase tracking-widest">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
          </span>
          En vivo
        </div>
        <h2 className="text-5xl md:text-6xl font-black text-gray-800 dark:text-white tracking-tight leading-none">
          {municipio}
        </h2>
        <p className="text-lg font-medium text-gray-500 dark:text-gray-400">
          {provincia} •{" "}
          <span className="text-blue-600 dark:text-blue-400">
            {descripcion}
          </span>
        </p>

        {/* Bloque de Temperatura Principal */}
        <div className="flex items-center justify-center lg:justify-start gap-5 pt-2">
          <span className="text-6xl filter drop-shadow-md">{icono}</span>
          <div className="flex flex-col border-l-2 border-gray-100 dark:border-gray-700 pl-5">
            <div className="flex items-baseline gap-1">
              <span className="text-5xl font-black text-gray-900 dark:text-white">
                {hoy.temperatura.maxima}º
              </span>
            </div>
            <div className="flex items-baseline gap-1 -mt-1">
              <span className="text-2xl font-bold text-gray-400 dark:text-gray-500">
                {hoy.temperatura.minima}º
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Evolución por tramos */}
      <div className="w-full lg:w-auto bg-gray-50 dark:bg-gray-800/40 p-6 rounded-[2.5rem] border border-gray-100 dark:border-gray-700">
        <p className="text-[10px] font-black text-gray-400 dark:text-gray-500 uppercase tracking-[0.2em] mb-6 text-center">
          Evolución del día
        </p>
        <div className="grid grid-cols-4 gap-4 md:gap-8">
          {evolucion.map((tramo, idx) => (
            <div key={idx} className="flex flex-col items-center gap-2 group">
              <span className="text-[10px] font-bold text-gray-400 dark:text-gray-500 uppercase group-hover:text-blue-500 transition-colors">
                {tramo.label}
              </span>
              <span className="text-2xl transition-transform group-hover:scale-110">
                {tramo.icono}
              </span>
              <div className="flex flex-col items-center">
                <span className="text-[10px] font-black text-blue-500">
                  {tramo.probLluvia}%
                </span>
                <span className="text-[8px] font-bold text-gray-400 uppercase">
                  Lluvia
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CurrentWeather;
