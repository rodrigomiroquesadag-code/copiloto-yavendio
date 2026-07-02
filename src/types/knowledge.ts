export type CaseType = "setup" | "error";

export interface KnowledgeCase {
  id: number;
  titulo: string;
  tipo: CaseType;
  sintomas: string[];
  causa: string;
  pasos: string[];
  recurso?: string;
  disparaFallback: boolean;
}

export type ConnectionOptionId = "opcion1" | "opcion2" | "opcion3";

export interface ConnectionOption {
  id: ConnectionOptionId;
  nombre: string;
  descripcion: string;
}
