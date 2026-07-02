import type {
  AiDiagnoseResult,
  DiagnoseRequest,
  DiagnoseResponse,
} from "../types/api";

/**
 * Calls the serverless Capa 2 endpoint. Returns null whenever AI diagnosis
 * isn't usable for any reason (no key, network error, bad JSON) so the
 * caller can fall back to Capa 1 without special-casing failure modes.
 */
export async function diagnoseWithAI(
  payload: DiagnoseRequest,
): Promise<AiDiagnoseResult | null> {
  try {
    const res = await fetch("/api/diagnose", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    if (!res.ok) return null;
    const data = (await res.json()) as DiagnoseResponse;
    if (data.mode === "ai") return data;
    return null;
  } catch {
    return null;
  }
}
