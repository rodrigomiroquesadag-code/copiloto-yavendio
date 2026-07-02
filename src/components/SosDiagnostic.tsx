import { useRef, useState } from "react";
import { KNOWLEDGE_BASE, findCaseById } from "../data/knowledge-base";
import { bestMatch } from "../lib/matcher";
import { diagnoseWithAI } from "../lib/api";
import type { KnowledgeCase } from "../types/knowledge";
import type { LoggedCase } from "../types/app";
import { SolutionCard } from "./SolutionCard";

interface SosDiagnosticProps {
  initialText?: string;
  onFallback: () => void;
  onLogCase: (entry: LoggedCase) => void;
}

type Tab = "grilla" | "texto" | "screenshot";
type ViewState = "form" | "loading" | "result" | "notfound";

interface ResolvedResult {
  kase: KnowledgeCase;
  mensajeAlUsuario?: string;
  confidence?: "alta" | "media" | "baja";
  origen: LoggedCase["origen"];
}

export function SosDiagnostic({
  initialText,
  onFallback,
  onLogCase,
}: SosDiagnosticProps) {
  const [tab, setTab] = useState<Tab>(initialText ? "texto" : "grilla");
  const [text, setText] = useState(initialText ?? "");
  const [view, setView] = useState<ViewState>("form");
  const [resolved, setResolved] = useState<ResolvedResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  function resolve(entry: ResolvedResult) {
    setResolved(entry);
    setView("result");
    onLogCase({
      caseId: entry.kase.id,
      titulo: entry.kase.titulo,
      tipo: entry.kase.tipo,
      origen: entry.origen,
      timestamp: Date.now(),
    });
  }

  function reset() {
    setResolved(null);
    setView("form");
    setText("");
  }

  function handleGridSelect(caseId: number) {
    const kase = findCaseById(caseId);
    if (!kase) return;
    resolve({ kase, origen: "grilla" });
  }

  async function handleTextSubmit() {
    if (!text.trim()) return;
    setView("loading");

    const ai = await diagnoseWithAI({ text });
    if (ai) {
      const kase = findCaseById(ai.caseId);
      if (kase) {
        resolve({
          kase,
          mensajeAlUsuario: ai.mensajeAlUsuario,
          confidence: ai.confidence,
          origen: "ia",
        });
        return;
      }
    }

    const match = bestMatch(text);
    if (match) {
      resolve({ kase: match, origen: "texto" });
    } else {
      setView("notfound");
    }
  }

  async function handleFileSelected(file: File) {
    setView("loading");
    const reader = new FileReader();
    reader.onload = async () => {
      const dataUrl = reader.result as string;
      const [prefix, base64] = dataUrl.split(",");
      const imageMediaType = prefix.match(/data:(.*);base64/)?.[1] ?? "image/jpeg";
      const ai = await diagnoseWithAI({ imageBase64: base64, imageMediaType });
      if (ai) {
        const kase = findCaseById(ai.caseId);
        if (kase) {
          resolve({
            kase,
            mensajeAlUsuario: ai.mensajeAlUsuario,
            confidence: ai.confidence,
            origen: "ia",
          });
          return;
        }
      }
      setView("form");
      setTab("texto");
      setText("");
      alert(
        "No pudimos leer la captura automáticamente (necesita conexión a IA). Por favor describe el error con tus palabras.",
      );
    };
    reader.readAsDataURL(file);
  }

  if (view === "result" && resolved) {
    return (
      <div className="mx-auto max-w-xl px-4 py-10 sm:px-6">
        <SolutionCard
          kase={resolved.kase}
          mensajeAlUsuario={resolved.mensajeAlUsuario}
          confidence={resolved.confidence}
          onFallback={onFallback}
          onReset={reset}
        />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-2xl px-4 py-10 sm:px-6">
      <h1 className="text-2xl font-semibold text-neutral-900">Modo SOS</h1>
      <p className="mt-1 text-sm text-neutral-600">
        Cuéntanos qué está pasando y te decimos cómo resolverlo.
      </p>

      <div className="mt-5 flex gap-1 rounded-lg bg-neutral-100 p-1 text-sm">
        <TabButton active={tab === "grilla"} onClick={() => setTab("grilla")}>
          Selección rápida
        </TabButton>
        <TabButton active={tab === "texto"} onClick={() => setTab("texto")}>
          Describe tu error
        </TabButton>
        <TabButton
          active={tab === "screenshot"}
          onClick={() => setTab("screenshot")}
        >
          Sube una captura
        </TabButton>
      </div>

      {view === "loading" && (
        <div className="mt-8 text-center text-sm font-medium text-neutral-500">
          Analizando tu caso…
        </div>
      )}

      {view === "notfound" && (
        <div className="mt-6 rounded-xl border border-neutral-200 bg-white p-4 text-sm text-neutral-600">
          No reconocimos tu caso con esa descripción. Prueba con más detalle
          (copia el mensaje de error tal cual) o usa la selección rápida.
          <button
            onClick={reset}
            className="mt-3 block text-sm font-semibold text-emerald-700 hover:text-emerald-800"
          >
            ← Intentar de nuevo
          </button>
        </div>
      )}

      {view === "form" && tab === "grilla" && (
        <div className="mt-5 grid grid-cols-1 gap-2.5 sm:grid-cols-2">
          {KNOWLEDGE_BASE.map((kase) => (
            <button
              key={kase.id}
              onClick={() => handleGridSelect(kase.id)}
              className="flex items-start gap-2 rounded-lg border border-neutral-200 bg-white p-3 text-left text-sm transition hover:border-emerald-400 hover:bg-emerald-50"
            >
              <span>{kase.tipo === "error" ? "🔴" : "🟡"}</span>
              <span className="font-medium text-neutral-800">
                {kase.titulo}
              </span>
            </button>
          ))}
        </div>
      )}

      {view === "form" && tab === "texto" && (
        <div className="mt-5">
          <textarea
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Ejemplo: 'Me sale que el sitio web no es válido' o pega el mensaje de error tal cual te lo muestra Meta."
            rows={5}
            className="w-full rounded-lg border border-neutral-300 p-3 text-sm outline-none focus:border-emerald-500"
          />
          <button
            onClick={handleTextSubmit}
            disabled={!text.trim()}
            className="mt-3 w-full rounded-lg bg-emerald-600 px-6 py-3 font-semibold text-white shadow-sm transition hover:bg-emerald-700 disabled:cursor-not-allowed disabled:opacity-50"
          >
            Diagnosticar
          </button>
        </div>
      )}

      {view === "form" && tab === "screenshot" && (
        <div className="mt-5">
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => {
              const file = e.target.files?.[0];
              if (file) handleFileSelected(file);
            }}
          />
          <button
            onClick={() => fileInputRef.current?.click()}
            className="w-full rounded-lg border-2 border-dashed border-neutral-300 bg-white p-8 text-center text-sm font-medium text-neutral-500 transition hover:border-emerald-400 hover:text-emerald-700"
          >
            📷 Toca para subir una captura del error
          </button>
          <p className="mt-2 text-xs text-neutral-400">
            Funciona mejor cuando la IA está activada. Si no, te pediremos que
            describas el error en texto.
          </p>
        </div>
      )}
    </div>
  );
}

function TabButton({
  active,
  onClick,
  children,
}: {
  active: boolean;
  onClick: () => void;
  children: React.ReactNode;
}) {
  return (
    <button
      onClick={onClick}
      className={
        "flex-1 rounded-md px-2 py-2 font-medium transition " +
        (active
          ? "bg-white text-emerald-700 shadow-sm"
          : "text-neutral-500 hover:text-neutral-700")
      }
    >
      {children}
    </button>
  );
}
