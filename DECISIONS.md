# Decisiones de diseño — Copiloto de Conexión yavendió!

## 1. Análisis del problema: ¿dónde se cae la gente?

Los 14 casos de la base de conocimiento se dividen en dos familias con dinámicas muy distintas:

**🟡 Setup (prevenible)** — 8 de los 14 casos (1, 2, 4, 5, 6, 10, y variantes de otros): el usuario no está "roto", simplemente no sabe qué campo llenar o qué botón tocar. No tiene sitio web, no tiene Business Portfolio, eligió Coexistence en vez de API, no tocó "Finalizar". Estos casos **no deberían llegar nunca al Modo SOS** — se pueden anticipar antes de que el usuario los viva, con las preguntas correctas en el Triage.

**🔴 Error (requiere diagnóstico)** — el resto (3, 7, 8, 9, 11, 12, 13, 14): bloqueos reales de la plataforma de Meta —número vinculado a otro portfolio, cuenta restringida, bot de IA de Meta activo, SMS que nunca llega—. Aquí no hay forma de prevenir con una pregunta previa; el usuario necesita un diagnóstico rápido en el momento exacto en que se traba.

Mapeado sobre el funnel manual de hoy (Meet 1:1), la persona humana:
1. Detecta quién está trabado → hoy lo hace mirando la pantalla compartida. Nuestro reemplazo: el usuario mismo se autodiagnostica en Modo SOS (no necesitamos detección automática para el MVP — ver "qué haría con más tiempo").
2. Diagnostica y resuelve → hoy es memoria humana sobre una guía interna. Nuestro reemplazo: los 14 casos codificados + matcher determinístico + IA opcional.
3. Documenta para reducir fricción futura → hoy es tácito, vive en la cabeza del operador. Nuestro reemplazo: cada diagnóstico se registra automáticamente en la tabla de "base de conocimiento viva" del Panel de Growth.

## 2. La tesis: ¿qué mueve el 15% → 50%?

Cuatro palancas, en orden de impacto esperado:

1. **Prevención por enrutamiento (Triage).** Si la mitad de los casos son "Setup" y son 100% anticipables con 3-4 preguntas, evitar que el usuario los viva ya mueve una fracción grande del drop-off sin que el usuario note que "hubo un problema" — simplemente nunca aparece.
2. **Desbloqueo instantáneo 24/7 (SOS).** El operador humano solo trabaja mientras el Meet está activo. El copiloto no duerme. Cada minuto que un usuario espera una respuesta es un minuto en que puede abandonar; eliminar la espera es directamente conversión.
3. **Rescate con fallback (Módulo D).** Los casos sin solución rápida (productos prohibidos, restricciones agotadas) hoy probablemente terminan en abandono total. Ofrecer el número prestado como salida positiva convierte un "no se pudo" en un "ya estás vendiendo, resuelve el resto con calma" — mantiene al negocio dentro del embudo en vez de perderlo.
4. **Documentación automática que compone con el tiempo (Growth).** Cada caso diagnosticado queda registrado sin esfuerzo humano. Con el tiempo esto revela qué casos son más frecuentes y dónde vale la pena invertir en prevenir aún más en el Triage — un loop de mejora que hoy depende de que el operador humano se acuerde de escribirlo en algún lado.

## 3. ¿Por qué esta solución y no otra?

- **¿Por qué no solo un rediseño del flujo de Meta?** No lo controlamos — es de Meta. Lo único que controlamos es todo lo que rodea ese flujo: qué le decimos antes, qué le decimos cuando falla.
- **¿Por qué no un FAQ estático?** Un FAQ obliga al usuario a *buscar* su error entre 14 opciones sin saber cuál aplica, con jerga que no entiende. El Modo SOS invierte la carga: el usuario describe lo que ve (texto, captura, o clic directo) y el sistema hace el matching. Es la diferencia entre un manual y un motor de búsqueda humano — que es exactamente lo que hace hoy el operador del Meet.
- **¿Por qué dos capas (determinística + IA) en vez de solo IA?** Un demo que dependa 100% de una API key configurada correctamente en producción es un demo frágil. La capa determinística garantiza que el producto *siempre* funciona — la IA es una mejora de calidad (mejor comprensión de texto libre y de capturas), nunca un punto único de falla.

## 4. Qué prioricé y qué dejé fuera (alcance de un día)

**Prioricé:** que el núcleo (Triage → Guía → SOS → Fallback) funcione de punta a punta sin ninguna configuración externa, con los 14 casos reales codificados fielmente, y con una experiencia visual que un dueño de negocio no técnico entienda sin fricción.

**Dejé fuera, deliberadamente:**
- **Integración real con Meta Embedded Signup.** Los pasos de la Guía son informativos, no ejecutan el flujo real de Meta. Automatizar eso es un proyecto en sí mismo (requiere aprobación de Meta como Tech Provider, manejo de tokens, etc.) y está fuera del alcance de un MVP de evaluación.
- **Detección automática de "quién está trabado".** Hoy el operador humano lo hace mirando la pantalla compartida en el Meet. Replicar eso requeriría instrumentar el flujo real de conexión con eventos (dónde se detiene el mouse, qué pantalla lleva más tiempo abierta) — no aplica sin el flujo real integrado.
- **Autenticación y persistencia real (base de datos).** El progreso se guarda en `localStorage` del navegador; el Panel de Growth usa datos mock más lo que se registra en la sesión actual. Suficiente para demostrar el concepto sin la complejidad de un backend con usuarios.
- **Multi-idioma.** Todo el copy está en español latino, el idioma real de los usuarios de yavendió en Perú.

## 5. Qué haría con más tiempo

1. **Integración real con Meta Embedded Signup**, para que la Guía ejecute pasos reales en vez de solo mostrar instrucciones, y detecte automáticamente cuándo el usuario completó cada paso.
2. **Detección automática de bloqueo** vía eventos del flujo real (tiempo en cada pantalla, reintentos) para poder ofrecer el Modo SOS proactivamente, sin que el usuario tenga que buscarlo.
3. **Base de conocimiento con embeddings/RAG real** en vez de matching por palabras clave — permitiría reconocer variaciones de redacción que hoy el matcher determinístico podría no capturar, mientras se mantiene el fallback a Capa 1.
4. **Multi-idioma (portugués)** para expandir a Brasil, donde yavendió también opera.
5. **Panel de Growth conectado a datos reales** (no mock) una vez que exista telemetría real del flujo de conexión.
6. **Tests automatizados** del matcher determinístico contra los 14 casos y sus variantes de redacción, para prevenir regresiones al agregar casos nuevos.

---

*Nota: los números del Panel de Growth (funnel, tasa de activación 15%→45%, frecuencia de errores) son **ilustrativos**, no datos reales de producción — están marcados como tales en la propia interfaz.*
