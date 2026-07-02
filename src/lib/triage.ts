import type { ConnectionOptionId } from "../types/knowledge";
import type { TriageAnswers, TriageResult } from "../types/app";

export function computeTriageResult(answers: TriageAnswers): TriageResult {
  let ruta: ConnectionOptionId = "opcion2";
  const advertencias: number[] = [];

  switch (answers.tieneWhatsapp) {
    case "business":
      ruta = "opcion2";
      break;
    case "normal":
      ruta = "opcion2";
      advertencias.push(5);
      break;
    case "nuevo":
      ruta = "opcion3";
      break;
    case "ninguno":
      ruta = "opcion1";
      break;
    default:
      ruta = "opcion2";
  }

  if (answers.tienePagina === "no") {
    advertencias.push(2);
  }
  if (answers.intentoAntes === "si") {
    advertencias.push(3);
  }
  if (answers.tienePortfolio === "no_o_no_se") {
    advertencias.push(4);
  }

  const checklist: string[] = [];
  if (advertencias.includes(5)) {
    checklist.push(
      "Migra tu número a WhatsApp Business antes de empezar (~10 min, no pierdes tus chats).",
    );
  }
  if (advertencias.includes(2)) {
    checklist.push(
      "Ten a la mano el link de tu página de Facebook o tu perfil de Instagram (te lo pedirán como 'sitio web').",
    );
  }
  if (advertencias.includes(3)) {
    checklist.push(
      "Si usaste otro servicio antes (Wati, SleekFlow, etc.), identifica en qué Business Portfolio quedó registrado tu número.",
    );
  }
  if (advertencias.includes(4)) {
    checklist.push(
      "No te preocupes por el Business Portfolio: lo puedes crear dentro del mismo flujo de conexión.",
    );
  }
  checklist.push("Ten tu celular a la mano para recibir el código de verificación por SMS o llamada.");

  return { ruta, advertencias, checklist };
}
