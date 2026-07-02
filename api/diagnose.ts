import Anthropic from "@anthropic-ai/sdk";
import { KNOWLEDGE_BASE } from "../src/data/knowledge-base";
import type { DiagnoseRequest, DiagnoseResponse } from "../src/types/api";

// Narrow local shape instead of depending on @vercel/node (whose transitive
// deps carry unrelated CVEs) — Vercel's Node runtime provides this at runtime
// regardless of which types we import.
interface VercelRequest {
  method?: string;
  body: unknown;
}
interface VercelResponse {
  status(code: number): { json(body: unknown): void };
}

function buildSystemPrompt(): string {
  const casos = KNOWLEDGE_BASE.map(
    (c) =>
      `#${c.id} [${c.tipo}] ${c.titulo}\nSíntomas: ${c.sintomas.join("; ")}\nCausa: ${c.causa}`,
  ).join("\n\n");

  return `Eres el motor de diagnóstico del "Copiloto de Conexión" de yavendió!, que ayuda a negocios a conectar su WhatsApp a Meta.

Tu única tarea: leer la descripción o captura de pantalla de un error que da el usuario, y decidir a cuál de los siguientes 14 casos de la base de conocimiento corresponde.

BASE DE CONOCIMIENTO:
${casos}

Responde SOLO con el caso que mejor coincide. Si ninguno coincide con confianza razonable, elige el caso más cercano igual pero baja la confianza a "baja". Escribe "mensajeAlUsuario" en español latino, cálido, breve (1-2 frases), sin culpar al usuario.`;
}

const OUTPUT_SCHEMA = {
  type: "object",
  properties: {
    caseId: { type: "integer" },
    confidence: { type: "string", enum: ["alta", "media", "baja"] },
    mensajeAlUsuario: { type: "string" },
  },
  required: ["caseId", "confidence", "mensajeAlUsuario"],
  additionalProperties: false,
};

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== "POST") {
    res.status(405).json({ mode: "deterministic" } satisfies DiagnoseResponse);
    return;
  }

  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    res.status(200).json({ mode: "deterministic" } satisfies DiagnoseResponse);
    return;
  }

  const { text, imageBase64, imageMediaType, stepContext } =
    req.body as DiagnoseRequest;

  if (!text && !imageBase64) {
    res.status(200).json({ mode: "deterministic" } satisfies DiagnoseResponse);
    return;
  }

  try {
    const client = new Anthropic({ apiKey });

    const contentParts: Anthropic.ContentBlockParam[] = [];
    if (imageBase64) {
      contentParts.push({
        type: "image",
        source: {
          type: "base64",
          media_type: (imageMediaType ??
            "image/jpeg") as Anthropic.Base64ImageSource["media_type"],
          data: imageBase64,
        },
      });
    }
    const textParts = [
      stepContext ? `Contexto del paso: ${stepContext}` : null,
      text ? `Descripción del usuario: ${text}` : null,
      imageBase64 && !text
        ? "El usuario adjuntó una captura de pantalla del error. Analízala."
        : null,
    ].filter(Boolean);
    contentParts.push({ type: "text", text: textParts.join("\n\n") });

    const response = await client.messages.create({
      model: "claude-opus-4-8",
      max_tokens: 512,
      system: buildSystemPrompt(),
      output_config: {
        format: { type: "json_schema", schema: OUTPUT_SCHEMA },
      },
      messages: [{ role: "user", content: contentParts }],
    });

    const textBlock = response.content.find((b) => b.type === "text");
    if (!textBlock || textBlock.type !== "text") {
      res.status(200).json({ mode: "deterministic" } satisfies DiagnoseResponse);
      return;
    }

    const cleaned = textBlock.text.replace(/```json\n?|```/g, "").trim();
    const parsed = JSON.parse(cleaned) as {
      caseId: number;
      confidence: "alta" | "media" | "baja";
      mensajeAlUsuario: string;
    };

    res.status(200).json({
      mode: "ai",
      caseId: parsed.caseId,
      confidence: parsed.confidence,
      mensajeAlUsuario: parsed.mensajeAlUsuario,
    } satisfies DiagnoseResponse);
  } catch (err) {
    console.error("diagnose: falling back to deterministic mode", err);
    res.status(200).json({ mode: "deterministic" } satisfies DiagnoseResponse);
  }
}
