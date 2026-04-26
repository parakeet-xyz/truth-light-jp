type MessageFormat = "html" | "markdown" | "plain";

export interface YumekawaChatMessage {
  id: number;
  role: "user" | "assistant";
  content: string;
  format?: MessageFormat;
  substanceCard?: SubstanceCardData | null;
}

export interface YumekawaChatRequest {
  message: string;
  history?: YumekawaChatMessage[];
}

export interface YumekawaChatResponse {
  reply: string;
  model: string;
  substanceCard?: SubstanceCardData | null;
}

export interface SubstanceRecord {
  id: string;
  name: string;
  common_name?: string;
  systematic_name?: string;
  aliases?: string[];
  categories?: string[];
  identifiers?: {
    pubchem_cid?: string;
    inchi_key?: string;
    smiles?: string;
  };
  legal?: {
    jp?: {
      law_number?: string;
      law_category?: string;
      official_name?: string;
      effective_date?: string;
      source_link?: string;
    };
  };
}

export interface SubstanceSearchResult {
  matched: boolean;
  query: string;
  match_type: MatchType;
  substance: SubstanceRecord | null | undefined;
  candidates?: Array<{
    id: string;
    name: string;
    common_name?: string;
    aliases?: string[];
  }>;
}

export interface SubstanceCardData {
  title: string
  commonName?: string
  systematicName?: string
  lawCategory?: string
  officialName?: string
  effectiveDate?: string
  sourceLink?: string
  pubchemCid?: string
  inchiKey?: string
  smiles?: string
  matchType?: string
}
