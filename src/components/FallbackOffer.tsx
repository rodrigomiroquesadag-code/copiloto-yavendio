interface FallbackOfferProps {
  onBack: () => void;
}

export function FallbackOffer({ onBack }: FallbackOfferProps) {
  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <div className="rounded-2xl border border-emerald-200 bg-emerald-50/50 p-6 text-center">
        <div className="text-4xl">🚀</div>
        <h1 className="mt-3 text-2xl font-semibold text-neutral-900">
          No te quedas afuera
        </h1>
        <p className="mt-3 text-sm text-neutral-600">
          Mientras resuelves tu bloqueo, <strong>yavendió te presta un número
          de WhatsApp ya verificado por 1 mes</strong>. Puedes empezar a
          vender hoy mismo, y cuando tu número esté listo, hacemos el cambio
          sin perder tu catálogo ni tu historial.
        </p>
        <div className="mt-5 rounded-xl border border-neutral-200 bg-white p-4 text-left">
          <h3 className="text-sm font-semibold text-neutral-800">
            Qué pasa después
          </h3>
          <ul className="mt-2 space-y-2 text-sm text-neutral-600">
            <li>1. Activamos tu número prestado en minutos.</li>
            <li>2. Conectas tu catálogo y empiezas a atender clientes ya.</li>
            <li>
              3. En paralelo, sigues los pasos de tu caso para resolver el
              número propio.
            </li>
            <li>4. Cuando esté listo, migramos sin fricción.</li>
          </ul>
        </div>
        <button className="mt-6 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700">
          Quiero mi número prestado
        </button>
        <button
          onClick={onBack}
          className="mt-3 text-sm font-medium text-neutral-500 hover:text-neutral-700"
        >
          ← Volver al diagnóstico
        </button>
      </div>
    </div>
  );
}
