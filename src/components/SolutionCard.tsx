import type { KnowledgeCase } from "../types/knowledge";

interface SolutionCardProps {
  kase: KnowledgeCase;
  mensajeAlUsuario?: string;
  confidence?: "alta" | "media" | "baja";
  onFallback: () => void;
  onReset: () => void;
}

export function SolutionCard({
  kase,
  mensajeAlUsuario,
  confidence,
  onFallback,
  onReset,
}: SolutionCardProps) {
  const isError = kase.tipo === "error";
  return (
    <div
      className={
        "rounded-2xl border p-6 " +
        (isError
          ? "border-red-200 bg-red-50/40"
          : "border-amber-200 bg-amber-50/40")
      }
    >
      <div className="flex items-center gap-2">
        <span className="text-2xl">{isError ? "🔴" : "🟡"}</span>
        <span
          className={
            "text-xs font-semibold uppercase tracking-wide " +
            (isError ? "text-red-700" : "text-amber-700")
          }
        >
          {isError ? "Error / bloqueo" : "Paso de configuración"}
        </span>
        {confidence && (
          <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[11px] font-medium text-neutral-500 border border-neutral-200">
            Confianza {confidence}
          </span>
        )}
      </div>

      <h2 className="mt-3 text-xl font-semibold text-neutral-900">
        {kase.titulo}
      </h2>

      {mensajeAlUsuario && (
        <p className="mt-2 text-sm italic text-neutral-600">
          {mensajeAlUsuario}
        </p>
      )}

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-neutral-800">
          Causa probable
        </h3>
        <p className="mt-1 text-sm text-neutral-600">{kase.causa}</p>
      </div>

      <div className="mt-4">
        <h3 className="text-sm font-semibold text-neutral-800">
          Cómo resolverlo
        </h3>
        <ol className="mt-2 space-y-2">
          {kase.pasos.map((paso, i) => (
            <li key={i} className="flex gap-2 text-sm text-neutral-700">
              <span className="font-semibold text-neutral-400">{i + 1}.</span>
              <span>{paso}</span>
            </li>
          ))}
        </ol>
      </div>

      {kase.recurso && (
        <p className="mt-4 text-xs text-neutral-500">
          Recurso: <span className="font-medium">{kase.recurso}</span>
        </p>
      )}

      {kase.disparaFallback && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4">
          <p className="text-sm font-medium text-emerald-800">
            Esto puede tomar tiempo en resolverse. No te tienes que quedar
            afuera mientras tanto.
          </p>
          <button
            onClick={onFallback}
            className="mt-3 w-full rounded-lg bg-emerald-600 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700"
          >
            Ver mi salida rápida →
          </button>
        </div>
      )}

      <button
        onClick={onReset}
        className="mt-5 text-sm font-medium text-neutral-500 hover:text-neutral-700"
      >
        ← Buscar otro problema
      </button>
    </div>
  );
}
