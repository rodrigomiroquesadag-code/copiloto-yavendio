import type { ConnectionOptionId } from "./knowledge";

export type Screen =
  | "home"
  | "triage"
  | "guide"
  | "sos"
  | "fallback"
  | "growth";

export interface TriageAnswers {
  tieneWhatsapp: "business" | "normal" | "nuevo" | "ninguno" | null;
  tienePagina: "si" | "no" | null;
  intentoAntes: "si" | "no" | null;
  tienePortfolio: "si" | "no_o_no_se" | null;
}

export interface TriageResult {
  ruta: ConnectionOptionId;
  advertencias: number[]; // case ids to pre-warn about
  checklist: string[];
}

export interface LoggedCase {
  caseId: number;
  titulo: string;
  tipo: "setup" | "error";
  origen: "grilla" | "texto" | "screenshot" | "ia";
  timestamp: number;
}

export interface GuideProgress {
  [ruta: string]: number[]; // completed step indices
}
