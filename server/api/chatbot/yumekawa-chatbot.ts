import { createError, readBody } from "h3";
import OpenAI from "openai";

import type {
  YumekawaChatRequest,
  YumekawaChatResponse,
  YumekawaChatMessage,
} from "~/utils/interfaces";
import { yumekawaChatbotConfig } from "~/utils/yumekawa-chatbot.config";

function toInputMessage(message: { role: "user" | "assistant"; content: string }) {
  return {
    role: message.role,
    content: [
      {
        type: "input_text" as const,
        text: message.content,
      },
    ],
  };
}

export default defineEventHandler(async (event): Promise<YumekawaChatResponse> => {
  const body = await readBody<YumekawaChatRequest>(event);
  

  if (!body?.message || typeof body.message !== "string") {
    throw createError({
      statusCode: 400,
      statusMessage: "message is required",
    });
  }
  console.log('messageの内容：'+body.message)

  const config = useRuntimeConfig(event)
  const apiKey = config.openaiApiKey
  if (!apiKey) {
    throw createError({
      statusCode: 500,
      statusMessage: "OPENAI_API_KEY is not configured",
    });
  }

  const history = Array.isArray(body.history)
    ? body.history
        .filter(
          (msg): msg is YumekawaChatMessage =>
            typeof msg.id === "number" &&
            (msg.role === "user" || msg.role === "assistant") &&
            typeof msg.content === "string" &&
            msg.content.trim().length > 0,
        )
        .slice(-10)
    : [];

  const input = [
    ...history.map(toInputMessage),
    toInputMessage({ role: "user", content: body.message.trim() }),
  ];

  const client = new OpenAI({ apiKey });

  const response = await client.responses.create({
    ...yumekawaChatbotConfig,
    input,
  } as any);

  const reply = response.output_text?.trim();

  if (!reply) {
    throw createError({
      statusCode: 502,
      statusMessage: "Empty response from model",
    });
  }

  return {
    reply,
    model: yumekawaChatbotConfig.model,
  };
});
