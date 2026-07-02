import type { ConnectionOption, KnowledgeCase } from "../types/knowledge";

export const CONNECTION_OPTIONS: ConnectionOption[] = [
  {
    id: "opcion1",
    nombre: "Número Pre-Verificado",
    descripcion:
      "yavendió te presta un número activo por 1 mes para que empieces a vender ya. Luego conectas el tuyo con calma.",
  },
  {
    id: "opcion2",
    nombre: "Coexistence",
    descripcion:
      "Usas el número que ya tienes en tu app de WhatsApp Business, sin perder tus chats.",
  },
  {
    id: "opcion3",
    nombre: "Conexión API",
    descripcion:
      "Para un número propio que todavía no tiene WhatsApp activado.",
  },
];

export const KNOWLEDGE_BASE: KnowledgeCase[] = [
  {
    id: 1,
    titulo: "Elegiste el tipo de conexión incorrecto",
    tipo: "setup",
    sintomas: [
      "este número está registrado con una cuenta de whatsapp existente",
      "número registrado con una cuenta existente",
      "registrado con una cuenta de whatsapp",
      "elegí la opción equivocada",
    ],
    causa:
      "Al elegir el tipo de cuenta, seleccionaste la opción incorrecta (API en vez de Coexistence) para un número que ya usa WhatsApp Business.",
    pasos: [
      "Vuelve al primer paso del flujo de conexión.",
      "Elige la opción 'Coexistence' (usar el número que ya tienes en tu WhatsApp Business), no 'Conexión API'.",
      "Continúa el flujo normalmente desde ahí.",
    ],
    disparaFallback: false,
  },
  {
    id: 2,
    titulo: "No tienes sitio web para el campo obligatorio de Meta",
    tipo: "setup",
    sintomas: [
      "sitio web",
      "ingresa una url del sitio web válida",
      "url del sitio web valida",
      "no tengo pagina web",
      "no tengo sitio web",
      "website url",
    ],
    causa:
      "Meta pide un campo de 'Sitio web' y no puedes avanzar porque tu negocio no tiene una página propia.",
    pasos: [
      "Usa el link de tu página de Facebook o tu perfil de Instagram, Meta acepta cualquier URL válida.",
      "Ejemplos válidos: https://www.facebook.com/profile.php?id=..., https://www.facebook.com/tunegocio, https://www.instagram.com/tucuenta",
      "Asegúrate de que el enlace esté activo, sea público, use HTTPS y describa tu negocio.",
    ],
    disparaFallback: false,
  },
  {
    id: 3,
    titulo: "Tu número ya está conectado a otro portfolio",
    tipo: "error",
    sintomas: [
      "el número de teléfono que ingresaste no está asociado con la empresa que seleccionaste",
      "desvincular este número",
      "ya está vinculado a otro portfolio",
      "domain_disabled",
      "external user not managed by admin",
      "usé wati antes",
      "usé sleekflow antes",
      "probé otro servicio antes",
    ],
    causa:
      "Ya probaste otro servicio (SleekFlow, Wati u otro BSP) que creó un Business Portfolio y vinculó tu número ahí.",
    pasos: [
      "Si tienes acceso a ese portfolio (opción recomendada): intenta la conexión usando ESE portfolio al que ya está vinculado tu número.",
      "Si prefieres desvincular: haz click en el enlace celeste del mensaje de error y sigue el flujo de desvinculación.",
      "Si NO tienes acceso al portfolio: click derecho sobre el botón celeste → 'Copiar URL', y busca el parámetro business_id= en la URL.",
      "Valida a qué portfolio corresponde ese business_id en business.facebook.com/latest/settings/business_info.",
      "Alternativas: inicia sesión con otra cuenta que sí tenga acceso, o migra WhatsApp Business → WhatsApp personal → de vuelta a Business (esto elimina la vinculación y no pierdes tus chats).",
    ],
    recurso: "business.facebook.com/latest/settings/business_info",
    disparaFallback: false,
  },
  {
    id: 4,
    titulo: "No tienes Business Portfolio en Meta",
    tipo: "setup",
    sintomas: [
      "no tengo business portfolio",
      "no tengo business manager",
      "no sé si tengo business manager",
      "no tengo administrador comercial",
    ],
    causa:
      "Tienes página de Facebook y WhatsApp Business, pero no tienes un Business Portfolio (antes llamado 'Business Manager') creado.",
    pasos: [
      "No necesitas crearlo antes: el mismo flujo de conexión te deja hacerlo.",
      "En el paso de seleccionar portfolio, elige 'Crear un portfolio comercial' y completa los datos pedidos.",
      "Ten en cuenta que cada persona puede crear hasta 2 portfolios como máximo.",
    ],
    disparaFallback: false,
  },
  {
    id: 5,
    titulo: "No tienes WhatsApp Business (solo WhatsApp normal)",
    tipo: "setup",
    sintomas: [
      "solo tengo whatsapp normal",
      "no tengo whatsapp business",
      "vendo por whatsapp personal",
      "whatsapp normal",
    ],
    causa:
      "Vendes por WhatsApp personal y necesitas migrar a WhatsApp Business antes de conectar.",
    pasos: [
      "Respalda tus chats en tu WhatsApp normal (Ajustes → Chats → Copia de seguridad).",
      "Descarga la app de WhatsApp Business desde tu tienda de aplicaciones.",
      "Ábrela con el mismo número → acepta la migración → restaura tu copia de seguridad.",
      "Configura tu perfil de negocio (nombre, foto, categoría, descripción).",
    ],
    recurso: undefined,
    disparaFallback: false,
  },
  {
    id: 6,
    titulo: "El botón 'Siguiente' está bloqueado en activos comerciales",
    tipo: "setup",
    sintomas: [
      "el botón siguiente está bloqueado",
      "boton siguiente deshabilitado",
      "no puedo avanzar en selecciona los activos comerciales",
      "botón azul claro no funciona",
    ],
    causa:
      "En la pantalla 'Selecciona los activos comerciales que quieres compartir', el dropdown de 'Cuenta de WhatsApp Business' quedó sin selección real (muestra el placeholder).",
    pasos: [
      "Toca el dropdown de 'Cuenta de WhatsApp Business' aunque parezca que ya tiene texto.",
      "Elige 'Crear nueva cuenta de WhatsApp Business' o selecciona una cuenta existente de la lista.",
      "El botón 'Siguiente' se activa automáticamente cuando ambos campos tienen una selección real.",
    ],
    disparaFallback: false,
  },
  {
    id: 7,
    titulo: "Tu cuenta está restringida por Meta",
    tipo: "error",
    sintomas: [
      "se ha restringido tu acceso a la publicidad",
      "unable to create account",
      "este negocio no cumple con la política de comercio de whatsapp",
      "tu cuenta de whatsapp business está restringida",
      "cuenta restringida",
      "cuenta bloqueada por meta",
    ],
    causa:
      "Meta puede bloquear en 3 niveles: cuenta de Facebook, Business Portfolio (política de comercio) o cuenta de WhatsApp Business. Causas comunes: envío masivo/spam, apps no oficiales (GB WhatsApp, etc.), venta de productos prohibidos, muchos reportes, contenido engañoso, catálogo con productos restringidos, o falso positivo.",
    pasos: [
      "Pregunta clave antes de invertir tiempo: ¿qué vende tu negocio? Si vendes productos prohibidos por Meta, no hay solución alternativa (ver opción de número prestado abajo).",
      "Si es cuenta de Facebook restringida: crea un portfolio desde otra cuenta de Facebook limpia y transfiere la propiedad (opción más rápida), usa la cuenta de un socio/familiar, o apela en facebook.com/accountquality.",
      "Si es el Portfolio (política de comercio): revisa la violación en facebook.com/business-support-home, limpia productos restringidos de tu catálogo, o apela con 'Request Review' (tienes 90 días).",
      "Si es la cuenta de WhatsApp Business: apela desde business-support-home, o prueba con otro número (chip prepago nuevo es más rápido que apelar).",
    ],
    recurso: "facebook.com/business-support-home",
    disparaFallback: true,
  },
  {
    id: 8,
    titulo: "Ambos portfolios bloqueados y llegaste al límite",
    tipo: "error",
    sintomas: [
      "alcanzaste el límite de portfolios comerciales",
      "no puedo crear otro business portfolio",
      "mis dos portfolios están bloqueados",
      "límite de portfolios",
    ],
    causa:
      "Tienes 2 Business Portfolios con restricciones y Meta no te deja crear uno nuevo porque llegaste al límite.",
    pasos: [
      "Elimina un portfolio: ve a Configuración → Información del negocio → quita todos los activos → elimínalo permanentemente → espera 24-48 horas antes de crear uno nuevo.",
      "Alternativa más rápida: usa la cuenta de otra persona (socio o cofundador) que tenga una cuenta limpia.",
      "Apela el portfolio que tenga más chance de resolverse mientras tanto.",
    ],
    disparaFallback: true,
  },
  {
    id: 9,
    titulo: "El bot de IA de Meta ya está conectado a tu número",
    tipo: "error",
    sintomas: [
      "your business ai agent is already linked to this phone number",
      "disconnect ai to unlink the agent",
      "bot de meta conectado",
      "ai de meta bloquea la conexión",
      "business ai agent",
    ],
    causa:
      "Meta promueve su propia IA gratuita en WhatsApp Business y, si ya está activa en tu número, bloquea la conexión con servicios como yavendió.",
    pasos: [
      "Abre WhatsApp Business y toca el ícono de 4 cuadritos (arriba a la derecha) que abre 'Herramientas'.",
      "Nota: en versiones recientes, 'Herramientas para empresas' ya no está en Ajustes, se movió a ese ícono.",
      "Entra a 'Business AI' / 'Inteligencia Artificial' → 'AI replies' → 'Disconnect AI'.",
      "Si la IA fue configurada por un tercero vía API: entra a business.facebook.com → WhatsApp Accounts → selecciona tu número → busca la integración de AI y desconéctala, o contacta al servicio que la configuró.",
    ],
    disparaFallback: false,
  },
  {
    id: 10,
    titulo: "No completaste correctamente el paso final",
    tipo: "setup",
    sintomas: [
      "escaneé el qr y no pasó nada",
      "ingresé el código y no aparece nada",
      "no veo la pantalla de éxito",
      "no terminó de conectar",
    ],
    causa:
      "Después de escanear el QR o ingresar el código, falta confirmar el último paso del flujo.",
    pasos: [
      "Busca y toca el botón 'Finalizar' del flujo, no cierres la ventana antes.",
      "Espera a que aparezca la pantalla '¡Perfecto! Tu canal está listo'.",
      "Si no aparece luego de unos segundos, refresca la página e inténtalo de nuevo desde el último paso.",
    ],
    disparaFallback: false,
  },
  {
    id: 11,
    titulo: "Facebook te redirige a tu cuenta personal",
    tipo: "error",
    sintomas: [
      "me lleva a mi perfil personal",
      "no entro al flujo de negocio",
      "facebook me redirige a mi perfil",
      "abre mi cuenta personal en vez del flujo",
    ],
    causa:
      "Tienes una sesión personal de Facebook abierta en el navegador y eso interfiere con el flujo embebido de negocio.",
    pasos: [
      "Opción más rápida: abre el flujo de conexión en una ventana de incógnito.",
      "Alternativa: cierra sesión de Facebook, borra las cookies de facebook.com y reinicia el navegador.",
      "Alternativa: cambia al perfil de tu página de negocio antes de iniciar el flujo.",
    ],
    disparaFallback: false,
  },
  {
    id: 12,
    titulo: "No te llega el SMS ni la llamada de verificación",
    tipo: "error",
    sintomas: [
      "no me llega el código",
      "no llega el sms",
      "no recibo la llamada de verificación",
      "nunca llega el código",
    ],
    causa:
      "Meta indica que enviará un código de verificación por SMS o llamada, pero nunca llega al celular.",
    pasos: [
      "Verifica que el número y el código de país sean correctos.",
      "Reenvía el código desde el mismo flujo.",
      "Prueba pedir el código por llamada en vez de SMS.",
      "Si sigue sin llegar: desactiva el bloqueo de números desconocidos/filtro de spam, desactiva 'No molestar', cambia de WiFi a datos móviles (o viceversa), prueba el chip en otro celular.",
      "Si ya reintentaste varias veces, espera al menos 1 hora: Meta bloquea temporalmente por protección anti-spam.",
    ],
    disparaFallback: false,
  },
  {
    id: 13,
    titulo: "Número vinculado a 'eventos automáticos'",
    tipo: "error",
    sintomas: [
      "tu número de teléfono ya está vinculado a los eventos automáticos",
      "desactiva las etiquetas automáticas",
      "eventos automáticos",
      "etiquetas en whatsapp business",
    ],
    causa:
      "Tu número tiene etiquetas automáticas activas en WhatsApp Business que impiden usarlo en el registro.",
    pasos: [
      "En la app de WhatsApp Business, ve a Herramientas para empresas → Etiquetas.",
      "Desactiva las etiquetas o eventos automáticos que estén activos.",
      "Vuelve a intentar la conexión.",
    ],
    disparaFallback: false,
  },
  {
    id: 14,
    titulo: "Tu número no cumple los requisitos de elegibilidad",
    tipo: "error",
    sintomas: [
      "tu número de teléfono no cumple los requisitos para conectarse",
      "se requiere más actividad en la app de whatsapp business",
      "número no elegible",
      "falta actividad en whatsapp business",
    ],
    causa:
      "Meta considera que el número tiene muy poca actividad reciente en WhatsApp Business para determinar su elegibilidad.",
    pasos: [
      "Usa el número activamente en la app de WhatsApp Business por unos días para generar historial de actividad.",
      "Mientras tanto, usa la Opción #1 (número pre-verificado) para no perder ventas.",
      "Vuelve a intentar la conexión de tu número pasado ese tiempo.",
    ],
    disparaFallback: true,
  },
];

export function findCaseById(id: number): KnowledgeCase | undefined {
  return KNOWLEDGE_BASE.find((c) => c.id === id);
}
