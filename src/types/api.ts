export interface DiagnoseRequest {
  text?: string;
  imageBase64?: string;
  imageMediaType?: string;
  stepContext?: string;
}

export interface AiDiagnoseResult {
  mode: "ai";
  caseId: number;
  confidence: "alta" | "media" | "baja";
  mensajeAlUsuario: string;
}

export interface DeterministicFallback {
  mode: "deterministic";
}

export type DiagnoseResponse = AiDiagnoseResult | DeterministicFallback;
