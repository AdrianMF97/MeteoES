const WeatherCard = ({ data }) => {
  const info = data;

  if (!info || !info.prediccion) {
    return (
      <div className="text-center p-10 text-blue-600 bg-blue-50 rounded-3xl border border-blue-100 font-bold">
        Cargando estructura de datos...
      </div>
    );
  }

  const hoy = info.prediccion.dia[0];

  const max = hoy.temperatura?.maxima || "--";
  const min = hoy.temperatura?.minima || "--";
  const lluvia =
    hoy.probPrecipitacion?.find((p) => p.periodo === "00-24")?.value ??
    hoy.probPrecipitacion[0]?.value ??
    0;
  const cielo =
    hoy.estadoCielo?.find((c) => c.descripcion !== "")?.descripcion ||
    "Despejado";

  return (
    <div className="animate-in fade-in zoom-in duration-700">
      <div className="text-center mb-10">
        <h3 className="text-5xl font-black text-gray-800 dark:text-white uppercase tracking-tighter">
          {info.nombre}
        </h3>
        <p className="text-blue-600 dark:text-blue-400 font-bold tracking-[0.3em] uppercase text-xs mt-2">
          {info.provincia}
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Temperatura */}
        <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-[2.5rem] border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <p className="text-gray-400 dark:text-gray-500 font-black text-[10px] uppercase mb-4 tracking-widest">
            Temperatura
          </p>
          <div className="flex justify-center items-baseline gap-3">
            <span className="text-6xl font-black text-red-500 leading-none">
              {max}º
            </span>
            <span className="text-3xl font-bold text-blue-600/40 leading-none">
              {min}º
            </span>
          </div>
          <p className="text-[10px] mt-4 text-gray-400 uppercase font-black">
            Máxima / Mínima
          </p>
        </div>

        {/* Cielo */}
        <div className="bg-blue-600 p-8 rounded-[2.5rem] shadow-2xl shadow-blue-600/40 text-center text-white flex flex-col justify-center items-center transform md:scale-110">
          <p className="text-blue-100/60 font-black text-[10px] uppercase mb-3 tracking-widest">
            Estado
          </p>
          <span className="text-6xl mb-4 drop-shadow-lg">
            {cielo.toLowerCase().includes("lluvia")
              ? "🌧️"
              : cielo.toLowerCase().includes("nuboso")
                ? "☁️"
                : "☀️"}
          </span>
          <p className="font-black text-xl leading-tight uppercase tracking-tighter italic">
            {cielo}
          </p>
        </div>

        {/* Lluvia */}
        <div className="bg-white/90 dark:bg-gray-800/90 p-8 rounded-[2.5rem] border border-gray-200 dark:border-gray-700 text-center shadow-sm">
          <p className="text-gray-400 dark:text-gray-500 font-black text-[10px] uppercase mb-4 tracking-widest">
            Prob. Lluvia
          </p>
          <div className="text-6xl font-black text-blue-600 leading-none">
            {lluvia}%
          </div>
          <p className="text-[10px] mt-4 text-gray-400 uppercase font-black">
            Precipitación
          </p>
        </div>
      </div>
    </div>
  );
};

export default WeatherCard;
