export interface FunnelStep {
  label: string;
  count: number;
}

export const FUNNEL_MOCK: FunnelStep[] = [
  { label: "Inician la conexión", count: 100 },
  { label: "Eligen tipo de conexión", count: 78 },
  { label: "Verifican su número", count: 52 },
  { label: "Completan datos de Meta (sitio web, portfolio)", count: 34 },
  { label: "Escanean QR / finalizan", count: 21 },
  { label: "Conectan hoy", count: 15 },
];

export interface ErrorFrequency {
  caseId: number;
  titulo: string;
  tipo: "setup" | "error";
  frecuencia: number;
}

// Frecuencia ilustrativa basada en la experiencia operativa reportada
// (casos de Setup, evitables por triage, son los más comunes).
export const ERROR_FREQUENCY_MOCK: ErrorFrequency[] = [
  { caseId: 2, titulo: "No tiene sitio web", tipo: "setup", frecuencia: 27 },
  {
    caseId: 1,
    titulo: "Tipo de conexión incorrecto",
    tipo: "setup",
    frecuencia: 19,
  },
  {
    caseId: 3,
    titulo: "Número en otro portfolio",
    tipo: "error",
    frecuencia: 15,
  },
  {
    caseId: 12,
    titulo: "No llega el SMS/llamada",
    tipo: "error",
    frecuencia: 11,
  },
  {
    caseId: 5,
    titulo: "No tiene WhatsApp Business",
    tipo: "setup",
    frecuencia: 9,
  },
  { caseId: 9, titulo: "Bot de IA de Meta conectado", tipo: "error", frecuencia: 7 },
  { caseId: 7, titulo: "Cuenta restringida por Meta", tipo: "error", frecuencia: 6 },
  { caseId: 4, titulo: "No tiene Business Portfolio", tipo: "setup", frecuencia: 6 },
];

export const ACTIVATION_BEFORE = 15;
export const ACTIVATION_PROJECTED = 45;
