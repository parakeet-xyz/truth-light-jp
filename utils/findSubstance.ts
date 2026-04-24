import fs from "node:fs/promises";
import path from "node:path";
import type { SubstanceRecord, SubstanceSearchResult } from "~/utils/interfaces";

let substanceCache: SubstanceRecord[] | null = null;

function normalizeText(input: string): string {
  return input
    .toLowerCase()
    .normalize("NFKC")
    .replace(/[‐-‒–—―ー]/g, "-")
    .replace(/\s+/g, "")
    .trim();
}

async function loadSubstances(): Promise<SubstanceRecord[]> {
  if (substanceCache) return substanceCache;

  const filePath = path.resolve(process.cwd(), "public/data/all_substances.json");
  const raw = await fs.readFile(filePath, "utf-8");
  const parsed = JSON.parse(raw) as SubstanceRecord[];

  substanceCache = parsed;
  return parsed;
}

function safeIncludes(haystack: string | undefined, needle: string): boolean {
  if (!haystack) return false;
  return normalizeText(haystack).includes(needle);
}

export async function findSubstanceInDb(query: string): Promise<SubstanceSearchResult> {
  const substances = await loadSubstances();
  const normalizedQuery = normalizeText(query);

  if (!normalizedQuery) {
    return {
      matched: false,
      query,
      match_type: "none",
      substance: null,
    };
  }

  for (const s of substances) {
    if (normalizeText(s.common_name ?? "") === normalizedQuery) {
      return { matched: true, query, match_type: "common_name_exact", substance: s };
    }
  }

  for (const s of substances) {
    if ((s.aliases ?? []).some((a) => normalizeText(a) === normalizedQuery)) {
      return { matched: true, query, match_type: "alias_exact", substance: s };
    }
  }

  for (const s of substances) {
    if (normalizeText(s.name ?? "") === normalizedQuery) {
      return { matched: true, query, match_type: "name_exact", substance: s };
    }
  }

  for (const s of substances) {
    if (normalizeText(s.legal?.jp?.official_name ?? "") === normalizedQuery) {
      return { matched: true, query, match_type: "official_name_exact", substance: s };
    }
  }

  for (const s of substances) {
    const fields = [
      s.name,
      s.common_name,
      s.systematic_name,
      s.legal?.jp?.official_name,
      ...(s.aliases ?? []),
    ].filter(Boolean) as string[];

    if (fields.some((f) => normalizeText(f) === normalizedQuery)) {
      return { matched: true, query, match_type: "normalized_exact", substance: s };
    }
  }

  const partialCandidates = substances.filter((s) => {
    return [
      safeIncludes(s.name, normalizedQuery),
      safeIncludes(s.common_name, normalizedQuery),
      safeIncludes(s.systematic_name, normalizedQuery),
      safeIncludes(s.legal?.jp?.official_name, normalizedQuery),
      (s.aliases ?? []).some((a) => safeIncludes(a, normalizedQuery)),
    ].some(Boolean);
  });

  if (partialCandidates.length > 0) {
    const top = partialCandidates[0];
    return {
      matched: true,
      query,
      match_type: "partial",
      substance: top,
      candidates: partialCandidates.slice(0, 5).map((s) => ({
        id: s.id,
        name: s.name,
        common_name: s.common_name,
        aliases: s.aliases,
      })),
    };
  }

  return {
    matched: false,
    query,
    match_type: "none",
    substance: null,
  };
}