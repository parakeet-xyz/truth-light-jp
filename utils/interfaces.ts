export interface YumekawaChatMessage {
  role: "user" | "assistant";
  content: string;
}

export interface YumekawaChatRequest {
  message: string;
  history?: YumekawaChatMessage[];
}

export interface YumekawaChatResponse {
  reply: string;
  model: string;
}
