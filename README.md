# Copiloto de Conexión yavendió!

MVP de un copiloto self-service que lleva a un negocio de WhatsApp de cero a "conectado" sin intervención humana: triage que enruta y previene errores comunes, guía paso a paso, un modo SOS de diagnóstico instantáneo (14 casos reales de conexión con Meta/WhatsApp) y un fallback elegante cuando un caso no tiene solución rápida.

Ver [DECISIONS.md](./DECISIONS.md) para el razonamiento de producto detrás de cada decisión.

## Correr en local

```bash
npm install
npm run dev
```

Abre `http://localhost:5173`. La app funciona completa desde el primer momento — el diagnóstico por selección rápida y por texto libre usa un matcher determinístico local, **sin necesitar ninguna API key**.

## Activar el diagnóstico con IA (opcional)

El texto libre y las capturas de pantalla pueden mejorar con Claude si configuras una API key de Anthropic. Sin ella, el sistema cae automáticamente al matcher determinístico — nunca se rompe.

```bash
# .env (no se sube al repo)
ANTHROPIC_API_KEY=sk-ant-...
```

Para probar el endpoint serverless en local necesitas la CLI de Vercel (`vercel dev`), ya que `npm run dev` solo levanta el frontend con Vite.

## Build

```bash
npm run build
```

## Deploy en Vercel

1. Importa el repo en [vercel.com](https://vercel.com/new).
2. (Opcional) agrega la variable de entorno `ANTHROPIC_API_KEY` en la configuración del proyecto para activar la Capa 2 de IA.
3. Deploy — no requiere configuración adicional, Vercel detecta Vite para el frontend y `/api/diagnose.ts` como función serverless automáticamente.

## Estructura

```
/src
  /components   Triage, GuidedSteps, SosDiagnostic, SolutionCard, FallbackOffer, GrowthDashboard...
  /data         knowledge-base.ts (los 14 casos), guides.ts, growth-mock.ts
  /lib          matcher.ts (Capa 1 determinística), api.ts (cliente de /api/diagnose), triage.ts, storage.ts
  /types        tipos compartidos
/api
  diagnose.ts   función serverless: Capa 2 con Claude, degrada a Capa 1 si no hay API key o falla
DECISIONS.md    razonamiento de producto y alcance
```
