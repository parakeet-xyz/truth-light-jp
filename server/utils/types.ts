export type OpenAiConfig = {
  model: string,
  input?: [
    { 
      role: "user" | "assistant" | "developer",
      content?: {
        type?: "input_text",
        text?: string,
      },
    },
  ],
  instructions?: string,
  text: {
    format: {
      type: "text" | "json_object" | "json_schema",
    },
    verbosity: "low" | "medium" | "high",
  },
  reasoning: {
    effort: "low" | "medium" | "high",
    summary: "concise" | "detailed" | "auto" | null,
  },
  tools?: string[],
  store?: boolean,
  include: string[],
}