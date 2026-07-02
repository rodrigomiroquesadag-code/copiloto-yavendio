import type { ConnectionOptionId } from "../types/knowledge";

export interface GuideStep {
  titulo: string;
  instruccion: string;
}

export const GUIDES: Record<ConnectionOptionId, GuideStep[]> = {
  opcion2: [
    {
      titulo: "Elige 'Ya uso WhatsApp Business en este número'",
      instruccion:
        "En el flujo de conexión, selecciona la opción Coexistence, para usar el número que ya tienes activo.",
    },
    {
      titulo: "Inicia sesión con tu cuenta de Facebook",
      instruccion:
        "Usa la cuenta de Facebook de tu negocio. Si tienes otra sesión personal abierta, mejor usa una ventana de incógnito.",
    },
    {
      titulo: "Selecciona o crea tu Business Portfolio",
      instruccion:
        "Si ya tienes uno, selecciónalo. Si no, el mismo flujo te deja crear uno nuevo en este paso.",
    },
    {
      titulo: "Selecciona tu cuenta de WhatsApp Business",
      instruccion:
        "En el dropdown de activos comerciales, elige la cuenta de WhatsApp Business que quieres compartir con yavendió.",
    },
    {
      titulo: "Ingresa el sitio web de tu negocio",
      instruccion:
        "Si no tienes página propia, usa el link de tu Facebook o Instagram.",
    },
    {
      titulo: "Verifica tu número",
      instruccion:
        "Ingresa el código que te llega por SMS o llamada al número que estás conectando.",
    },
    {
      titulo: "Escanea el código QR",
      instruccion:
        "Abre WhatsApp Business en tu celular y escanea el QR para sincronizar tu cuenta (esto no borra tus chats).",
    },
    {
      titulo: "Finaliza la conexión",
      instruccion:
        "Toca el botón 'Finalizar' y espera la pantalla de '¡Perfecto! Tu canal está listo'.",
    },
  ],
  opcion3: [
    {
      titulo: "Elige 'Quiero conectar un número nuevo'",
      instruccion:
        "En el flujo de conexión, selecciona la opción de Conexión API para un número que aún no tiene WhatsApp activo.",
    },
    {
      titulo: "Inicia sesión con tu cuenta de Facebook",
      instruccion:
        "Usa la cuenta de Facebook de tu negocio. Si tienes otra sesión personal abierta, mejor usa una ventana de incógnito.",
    },
    {
      titulo: "Selecciona o crea tu Business Portfolio",
      instruccion:
        "Si ya tienes uno, selecciónalo. Si no, el mismo flujo te deja crear uno nuevo en este paso.",
    },
    {
      titulo: "Crea una nueva cuenta de WhatsApp Business",
      instruccion: "Dentro del flujo, elige la opción de crear una cuenta de WhatsApp Business nueva.",
    },
    {
      titulo: "Ingresa el número que quieres usar",
      instruccion:
        "Debe ser un número que no tenga WhatsApp activo actualmente (personal ni Business).",
    },
    {
      titulo: "Ingresa el sitio web de tu negocio",
      instruccion:
        "Si no tienes página propia, usa el link de tu Facebook o Instagram.",
    },
    {
      titulo: "Verifica tu número",
      instruccion: "Ingresa el código que te llega por SMS o llamada.",
    },
    {
      titulo: "Finaliza la conexión",
      instruccion:
        "Toca el botón 'Finalizar' y espera la pantalla de '¡Perfecto! Tu canal está listo'.",
    },
  ],
  opcion1: [
    {
      titulo: "Solicita tu número pre-verificado",
      instruccion:
        "Pide al equipo de yavendió que te preste un número activo por 1 mes para empezar a vender de inmediato.",
    },
    {
      titulo: "Actívalo en tu panel de yavendió",
      instruccion: "Sigue las instrucciones para dejarlo funcionando en minutos.",
    },
    {
      titulo: "Empieza a vender ya",
      instruccion:
        "Usa este número mientras resuelves con calma la conexión de tu número definitivo.",
    },
    {
      titulo: "Agenda el cambio a tu número propio",
      instruccion:
        "Cuando tu número esté listo (o hayas resuelto tu bloqueo), coordina el cambio sin perder tu catálogo ni tu historial.",
    },
  ],
};
