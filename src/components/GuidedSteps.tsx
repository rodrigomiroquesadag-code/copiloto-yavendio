import type { ConnectionOptionId } from "../types/knowledge";
import { GUIDES } from "../data/guides";
import { CONNECTION_OPTIONS } from "../data/knowledge-base";

interface GuidedStepsProps {
  ruta: ConnectionOptionId;
  completed: number[];
  onToggleStep: (index: number) => void;
  onStuck: (stepTitle: string) => void;
}

export function GuidedSteps({
  ruta,
  completed,
  onToggleStep,
  onStuck,
}: GuidedStepsProps) {
  const steps = GUIDES[ruta];
  const opcion = CONNECTION_OPTIONS.find((o) => o.id === ruta)!;
  const doneCount = completed.length;
  const progressPct = Math.round((doneCount / steps.length) * 100);
  const allDone = doneCount === steps.length;

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        {opcion.nombre}
      </span>
      <h1 className="mt-1 text-2xl font-semibold text-neutral-900">
        Guía paso a paso
      </h1>

      <div className="mt-4">
        <div className="h-2 w-full overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-emerald-600 transition-all"
            style={{ width: `${progressPct}%` }}
          />
        </div>
        <p className="mt-1.5 text-xs font-medium text-neutral-500">
          {doneCount} de {steps.length} pasos completados
        </p>
      </div>

      {allDone && (
        <div className="mt-5 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm font-medium text-emerald-800">
          🎉 ¡Completaste todos los pasos! Si Meta ya te mostró la pantalla de
          éxito, tu WhatsApp está conectado.
        </div>
      )}

      <div className="mt-6 flex flex-col gap-3">
        {steps.map((step, i) => {
          const isDone = completed.includes(i);
          return (
            <div
              key={i}
              className={
                "rounded-xl border p-4 transition " +
                (isDone
                  ? "border-emerald-200 bg-emerald-50/40"
                  : "border-neutral-200 bg-white")
              }
            >
              <div className="flex items-start gap-3">
                <button
                  onClick={() => onToggleStep(i)}
                  className={
                    "mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full border text-xs font-bold transition " +
                    (isDone
                      ? "border-emerald-600 bg-emerald-600 text-white"
                      : "border-neutral-300 text-transparent hover:border-emerald-400")
                  }
                  aria-label={isDone ? "Marcar como pendiente" : "Marcar como hecho"}
                >
                  ✓
                </button>
                <div className="flex-1">
                  <h3
                    className={
                      "text-sm font-semibold " +
                      (isDone
                        ? "text-neutral-500 line-through"
                        : "text-neutral-900")
                    }
                  >
                    {i + 1}. {step.titulo}
                  </h3>
                  <p className="mt-1 text-sm text-neutral-600">
                    {step.instruccion}
                  </p>
                  <button
                    onClick={() => onStuck(step.titulo)}
                    className="mt-2.5 text-xs font-semibold text-amber-700 hover:text-amber-800"
                  >
                    🆘 Estoy atascado en este paso
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
