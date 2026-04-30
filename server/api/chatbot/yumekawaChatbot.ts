import { createError, readBody } from "h3";
import OpenAI from "openai";

import type {
  YumekawaChatRequest,
  YumekawaChatResponse,
  YumekawaChatMessage,
} from "~/utils/interfaces";
import { yumekawaChatbotConfig } from "~/utils/yumekawaChatbot.config";

import { findSubstanceInDb } from "~/server/utils/substances/findSubstance"

function toInputMessage(message: { role: "user" | "assistant"; content: string }) {
  return {
    role: message.role,
    content: message.content,
  };
}

function isFunctionCall(
  item: unknown,
): item is { type: "function_call"; name: string; arguments: string; call_id: string } {
  return (
    typeof item === "object" &&
    item !== null &&
    "type" in item &&
    (item as { type?: unknown }).type === "function_call" &&
    "name" in item &&
    typeof (item as { name?: unknown }).name === "string" &&
    "arguments" in item &&
    typeof (item as { arguments?: unknown }).arguments === "string" &&
    "call_id" in item &&
    typeof (item as { call_id?: unknown }).call_id === "string"
  );
}

function buildSubstanceCard(toolResult: Awaited<ReturnType<typeof findSubstanceInDb>>) {
  const s = toolResult.substance

  if (!toolResult.matched || !s) {
    return null
  }

  return {
    title: s.name ?? s.common_name ?? "物質情報",
    commonName: s.common_name ?? "",
    systematicName: s.systematic_name ?? "",
    lawCategory: s.legal?.jp?.law_category ?? "",
    officialName: s.legal?.jp?.official_name ?? "",
    effectiveDate: s.legal?.jp?.effective_date ?? "",
    sourceLink: s.legal?.jp?.source_link ?? "",
    pubchemCid: s.identifiers?.pubchem_cid ?? "",
    inchiKey: s.identifiers?.inchi_key ?? "",
    smiles: s.identifiers?.smiles ?? "",
    matchType: toolResult.match_type,
  }
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
        .slice(-11, -1)
    : [];

  const input = [
    ...history.map(toInputMessage),
    toInputMessage({ role: "user", content: body.message.trim() }),
  ];

  const client = new OpenAI({ apiKey });

  const initialResponse = await client.responses.create({
    ...yumekawaChatbotConfig,
    input,
  } as any);

  console.log('initialResponseの内容：', initialResponse);

  const toolCall = initialResponse.output
    .filter(isFunctionCall)
    .find((item) => item.name === "find_substance_in_db");

  if (toolCall) {
    const args = JSON.parse(toolCall.arguments) as { query?: string }
    const toolResult = await findSubstanceInDb(args.query ?? "")

    const finalResponse = await client.responses.create({
      model: "gpt-5.4-mini",
      previous_response_id: initialResponse.id,
      input: [
        {
          type: "function_call_output",
          call_id: toolCall.call_id,
          output: JSON.stringify(toolResult),
        },
      ],
    });

    const reply = finalResponse.output_text?.trim();

    if (!reply) {
      throw createError({
        statusCode: 502,
        statusMessage: "Empty response from model after tool call",
      });
    }

    return {
      reply,
      model: yumekawaChatbotConfig.model,
      substanceCard: buildSubstanceCard(toolResult),
    };
  } else {
    const reply = initialResponse.output_text?.trim();

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
  }
});
