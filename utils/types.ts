export type OpenAiConfig = {
  model: string;
  instructions?: string;
  text: {
    format: {
      type: "text" | "json_object" | "json_schema";
    };
    verbosity: "low" | "medium" | "high";
  };
  reasoning: {
    effort: "low" | "medium" | "high";
    summary: "concise" | "detailed" | "auto" | null;
  };
  tools?: unknown[];
  store?: boolean;
  include?: ("reasoning.encrypted_content" | "web_search_call.action.sources")[];
};
