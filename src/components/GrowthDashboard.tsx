import {
  ACTIVATION_BEFORE,
  ACTIVATION_PROJECTED,
  ERROR_FREQUENCY_MOCK,
  FUNNEL_MOCK,
} from "../data/growth-mock";
import type { LoggedCase } from "../types/app";

interface GrowthDashboardProps {
  loggedCases: LoggedCase[];
}

export function GrowthDashboard({ loggedCases }: GrowthDashboardProps) {
  const maxFunnel = FUNNEL_MOCK[0].count;
  const maxError = Math.max(...ERROR_FREQUENCY_MOCK.map((e) => e.frecuencia));

  return (
    <div className="mx-auto max-w-3xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-neutral-900">
        Panel de Growth
      </h1>
      <p className="mt-1 text-sm text-neutral-600">
        Así se vería la conexión con el copiloto activo.
      </p>
      <div className="mt-2 inline-block rounded-full bg-neutral-100 px-3 py-1 text-xs font-medium text-neutral-500">
        Datos ilustrativos, no son métricas reales de producción
      </div>

      {/* Activation rate */}
      <section className="mt-8 rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">
          Tasa de activación
        </h2>
        <div className="mt-4 grid grid-cols-2 gap-4">
          <div className="rounded-xl bg-neutral-50 p-4 text-center">
            <div className="text-3xl font-bold text-neutral-400">
              {ACTIVATION_BEFORE}%
            </div>
            <div className="mt-1 text-xs font-medium text-neutral-500">
              Antes (proceso manual)
            </div>
          </div>
          <div className="rounded-xl bg-emerald-50 p-4 text-center">
            <div className="text-3xl font-bold text-emerald-700">
              {ACTIVATION_PROJECTED}%
            </div>
            <div className="mt-1 text-xs font-medium text-emerald-700">
              Proyectado con el copiloto
            </div>
          </div>
        </div>
      </section>

      {/* Funnel */}
      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">
          Funnel de conexión (hoy, sin copiloto)
        </h2>
        <div className="mt-4 flex flex-col gap-3">
          {FUNNEL_MOCK.map((step, i) => {
            const pct = Math.round((step.count / maxFunnel) * 100);
            const prev = i > 0 ? FUNNEL_MOCK[i - 1].count : null;
            const dropPct = prev ? Math.round(((prev - step.count) / prev) * 100) : null;
            return (
              <div key={step.label}>
                <div className="flex items-center justify-between text-xs font-medium text-neutral-600">
                  <span>{step.label}</span>
                  <span>
                    {step.count}
                    {dropPct !== null && (
                      <span className="ml-2 text-red-500">-{dropPct}%</span>
                    )}
                  </span>
                </div>
                <div className="mt-1 h-3 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className="h-full rounded-full bg-emerald-600"
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Top errors */}
      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">
          Errores más frecuentes
        </h2>
        <div className="mt-2 flex items-center gap-4 text-xs text-neutral-500">
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-amber-400" /> Setup
          </span>
          <span className="flex items-center gap-1">
            <span className="h-2.5 w-2.5 rounded-full bg-red-400" /> Error
          </span>
        </div>
        <div className="mt-4 flex flex-col gap-3">
          {ERROR_FREQUENCY_MOCK.map((err) => {
            const pct = Math.round((err.frecuencia / maxError) * 100);
            return (
              <div key={err.caseId}>
                <div className="flex items-center justify-between text-xs font-medium text-neutral-600">
                  <span>
                    #{err.caseId} {err.titulo}
                  </span>
                  <span>{err.frecuencia}</span>
                </div>
                <div className="mt-1 h-2.5 w-full overflow-hidden rounded-full bg-neutral-100">
                  <div
                    className={
                      "h-full rounded-full " +
                      (err.tipo === "setup" ? "bg-amber-400" : "bg-red-400")
                    }
                    style={{ width: `${pct}%` }}
                  />
                </div>
              </div>
            );
          })}
        </div>
      </section>

      {/* Auto-logged cases */}
      <section className="mt-6 rounded-2xl border border-neutral-200 bg-white p-5">
        <h2 className="text-sm font-semibold text-neutral-800">
          Base de conocimiento viva (casos registrados en esta sesión)
        </h2>
        <p className="mt-1 text-xs text-neutral-500">
          Cada vez que el copiloto diagnostica un caso, queda documentado
          automáticamente, sin que nadie tenga que anotarlo a mano.
        </p>
        {loggedCases.length === 0 ? (
          <p className="mt-4 text-sm text-neutral-400">
            Todavía no hay casos registrados. Usa el Modo SOS para ver cómo se
            llena esta tabla sola.
          </p>
        ) : (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-xs">
              <thead>
                <tr className="border-b border-neutral-200 text-neutral-500">
                  <th className="pb-2 pr-3 font-medium">Caso</th>
                  <th className="pb-2 pr-3 font-medium">Tipo</th>
                  <th className="pb-2 pr-3 font-medium">Origen</th>
                  <th className="pb-2 font-medium">Hora</th>
                </tr>
              </thead>
              <tbody>
                {[...loggedCases]
                  .reverse()
                  .map((c, i) => (
                    <tr key={i} className="border-b border-neutral-100">
                      <td className="py-2 pr-3 text-neutral-700">
                        #{c.caseId} {c.titulo}
                      </td>
                      <td className="py-2 pr-3">
                        {c.tipo === "setup" ? "🟡 Setup" : "🔴 Error"}
                      </td>
                      <td className="py-2 pr-3 capitalize text-neutral-500">
                        {c.origen}
                      </td>
                      <td className="py-2 text-neutral-500">
                        {new Date(c.timestamp).toLocaleTimeString("es-PE")}
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
        )}
      </section>
    </div>
  );
}
