interface HomeProps {
  onStartTriage: () => void;
  onGoToSos: () => void;
}

export function Home({ onStartTriage, onGoToSos }: HomeProps) {
  return (
    <div className="mx-auto max-w-2xl px-4 py-12 sm:px-6 sm:py-20 text-center">
      <span className="inline-block rounded-full bg-emerald-50 px-3 py-1 text-xs font-medium text-emerald-700">
        yavendió!
      </span>
      <h1 className="mt-4 text-3xl font-semibold tracking-tight text-neutral-900 sm:text-4xl">
        Conecta tu WhatsApp sin trabarte
      </h1>
      <p className="mt-4 text-base text-neutral-600 sm:text-lg">
        Responde 3 preguntas rápidas, sigue una guía paso a paso, y si algo
        falla, te decimos exactamente qué hacer al instante. Sin esperar a
        nadie.
      </p>
      <div className="mt-8 flex flex-col items-center gap-3 sm:flex-row sm:justify-center">
        <button
          onClick={onStartTriage}
          className="w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 sm:w-auto"
        >
          Empezar a conectar
        </button>
        <button
          onClick={onGoToSos}
          className="w-full rounded-lg border border-neutral-300 bg-white px-6 py-3 font-semibold text-neutral-700 transition hover:bg-neutral-50 sm:w-auto"
        >
          Ya tengo un error, ir directo a SOS
        </button>
      </div>
      <div className="mt-12 grid grid-cols-1 gap-4 text-left sm:grid-cols-3">
        <FeatureCard
          emoji="🧭"
          title="Ruta correcta desde el inicio"
          desc="Te enrutamos a la opción de conexión que te corresponde y evitamos el error más común."
        />
        <FeatureCard
          emoji="🆘"
          title="SOS al instante"
          desc="¿Te atoraste? Reconocemos el error y te damos la solución paso a paso, 24/7."
        />
        <FeatureCard
          emoji="🚀"
          title="Nunca te quedas afuera"
          desc="Si tu caso no tiene solución rápida, te prestamos un número para que vendas ya."
        />
      </div>
    </div>
  );
}

function FeatureCard({
  emoji,
  title,
  desc,
}: {
  emoji: string;
  title: string;
  desc: string;
}) {
  return (
    <div className="rounded-xl border border-neutral-200 bg-white p-4">
      <div className="text-2xl">{emoji}</div>
      <h3 className="mt-2 text-sm font-semibold text-neutral-900">{title}</h3>
      <p className="mt-1 text-xs text-neutral-500">{desc}</p>
    </div>
  );
}
