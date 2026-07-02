import type { ConnectionOption } from "../types/knowledge";

interface RouteCardProps {
  opcion: ConnectionOption;
  checklist: string[];
  onContinue: () => void;
}

export function RouteCard({ opcion, checklist, onContinue }: RouteCardProps) {
  return (
    <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6">
      <span className="text-xs font-semibold uppercase tracking-wide text-emerald-700">
        Tu mejor camino
      </span>
      <h2 className="mt-1 text-2xl font-semibold text-neutral-900">
        {opcion.nombre}
      </h2>
      <p className="mt-2 text-sm text-neutral-600">{opcion.descripcion}</p>

      <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-4">
        <h3 className="text-sm font-semibold text-neutral-800">
          Ten esto a la mano antes de empezar
        </h3>
        <ul className="mt-2 space-y-2">
          {checklist.map((item, i) => (
            <li key={i} className="flex items-start gap-2 text-sm text-neutral-600">
              <span className="mt-0.5 text-emerald-600">✓</span>
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>

      <button
        onClick={onContinue}
        className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700"
      >
        Empezar guía paso a paso
      </button>
    </div>
  );
}
