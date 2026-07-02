import { useState } from "react";
import type { TriageAnswers, TriageResult } from "../types/app";
import { computeTriageResult } from "../lib/triage";
import { CONNECTION_OPTIONS } from "../data/knowledge-base";
import { RouteCard } from "./RouteCard";

interface TriageProps {
  onComplete: (result: TriageResult) => void;
}

const TOTAL_STEPS = 4;

export function Triage({ onComplete }: TriageProps) {
  const [step, setStep] = useState(0);
  const [answers, setAnswers] = useState<TriageAnswers>({
    tieneWhatsapp: null,
    tienePagina: null,
    intentoAntes: null,
    tienePortfolio: null,
  });
  const [result, setResult] = useState<TriageResult | null>(null);

  function next(partial: Partial<TriageAnswers>) {
    const updated = { ...answers, ...partial };
    setAnswers(updated);
    if (step + 1 >= TOTAL_STEPS) {
      setResult(computeTriageResult(updated));
    } else {
      setStep(step + 1);
    }
  }

  function back() {
    if (step > 0) setStep(step - 1);
  }

  if (result) {
    const opcion = CONNECTION_OPTIONS.find((o) => o.id === result.ruta)!;
    return (
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <RouteCard
          opcion={opcion}
          checklist={result.checklist}
          onContinue={() => onComplete(result)}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
      <ProgressDots total={TOTAL_STEPS} current={step} />
      {step === 0 && (
        <Question
          title="¿Ya usas WhatsApp Business en el número que quieres conectar?"
          options={[
            { label: "Sí, ya uso WhatsApp Business", value: "business" },
            { label: "Uso WhatsApp normal (no Business)", value: "normal" },
            {
              label: "No tengo WhatsApp en ese número / es un número nuevo",
              value: "nuevo",
            },
            {
              label: "No tengo número o quiero probar rápido",
              value: "ninguno",
            },
          ]}
          onSelect={(value) =>
            next({ tieneWhatsapp: value as TriageAnswers["tieneWhatsapp"] })
          }
        />
      )}
      {step === 1 && (
        <Question
          title="¿Tu negocio tiene página de Facebook o Instagram?"
          options={[
            { label: "Sí", value: "si" },
            { label: "No", value: "no" },
          ]}
          onSelect={(value) =>
            next({ tienePagina: value as TriageAnswers["tienePagina"] })
          }
          onBack={back}
        />
      )}
      {step === 2 && (
        <Question
          title="¿Habías intentado conectar tu número antes con otro servicio (Wati, SleekFlow, otro)?"
          options={[
            { label: "Sí", value: "si" },
            { label: "No", value: "no" },
          ]}
          onSelect={(value) =>
            next({ intentoAntes: value as TriageAnswers["intentoAntes"] })
          }
          onBack={back}
        />
      )}
      {step === 3 && (
        <Question
          title="¿Tienes Business Portfolio en Meta (antes 'Business Manager')?"
          options={[
            { label: "Sí", value: "si" },
            { label: "No / No sé", value: "no_o_no_se" },
          ]}
          onSelect={(value) =>
            next({
              tienePortfolio: value as TriageAnswers["tienePortfolio"],
            })
          }
          onBack={back}
        />
      )}
    </div>
  );
}

function ProgressDots({ total, current }: { total: number; current: number }) {
  return (
    <div className="mb-6 flex items-center gap-2">
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          className={
            "h-1.5 flex-1 rounded-full transition " +
            (i <= current ? "bg-emerald-600" : "bg-neutral-200")
          }
        />
      ))}
    </div>
  );
}

function Question({
  title,
  options,
  onSelect,
  onBack,
}: {
  title: string;
  options: { label: string; value: string }[];
  onSelect: (value: string) => void;
  onBack?: () => void;
}) {
  return (
    <div>
      <h2 className="text-xl font-semibold text-neutral-900">{title}</h2>
      <div className="mt-5 flex flex-col gap-2.5">
        {options.map((opt) => (
          <button
            key={opt.value}
            onClick={() => onSelect(opt.value)}
            className="rounded-lg border border-neutral-200 bg-white px-4 py-3 text-left text-sm font-medium text-neutral-800 transition hover:border-emerald-400 hover:bg-emerald-50"
          >
            {opt.label}
          </button>
        ))}
      </div>
      {onBack && (
        <button
          onClick={onBack}
          className="mt-5 text-sm font-medium text-neutral-500 hover:text-neutral-700"
        >
          ← Volver
        </button>
      )}
    </div>
  );
}
