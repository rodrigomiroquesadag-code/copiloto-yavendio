import { KNOWLEDGE_BASE } from "../data/knowledge-base";
import type { KnowledgeCase } from "../types/knowledge";

function normalize(text: string): string {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[̀-ͯ]/g, "")
    .trim();
}

export interface MatchResult {
  case: KnowledgeCase;
  score: number;
}

/**
 * Keyword matcher: scores each case by how many of its sintomas
 * phrases appear (partially) in the user's free text.
 */
export function matchByText(input: string): MatchResult[] {
  const normalizedInput = normalize(input);
  if (!normalizedInput) return [];

  const results: MatchResult[] = [];

  for (const kase of KNOWLEDGE_BASE) {
    let score = 0;
    for (const sintoma of kase.sintomas) {
      const normalizedSintoma = normalize(sintoma);
      if (!normalizedSintoma) continue;
      if (normalizedInput.includes(normalizedSintoma)) {
        score += normalizedSintoma.split(" ").length;
        continue;
      }
      const words = normalizedSintoma.split(" ").filter((w) => w.length > 3);
      const hits = words.filter((w) => normalizedInput.includes(w));
      if (words.length > 0 && hits.length / words.length >= 0.6) {
        score += hits.length * 0.5;
      }
    }
    if (score > 0) {
      results.push({ case: kase, score });
    }
  }

  return results.sort((a, b) => b.score - a.score);
}

export function bestMatch(input: string): KnowledgeCase | null {
  const matches = matchByText(input);
  return matches.length > 0 ? matches[0].case : null;
}

export function matchById(id: number): KnowledgeCase | undefined {
  return KNOWLEDGE_BASE.find((c) => c.id === id);
}
