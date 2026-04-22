export interface YumekawaChatMessage {
  id: number;
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
