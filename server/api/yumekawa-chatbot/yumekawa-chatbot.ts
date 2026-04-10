import { yumekawaChatbotConfig } from "~/server/utils/yumekawa-chatbot.config"
import OpenAI from "openai"

const client = new OpenAI()
const responce = client.responses.create({
  model: "gpt-5.4-nano",
  instructions: "語尾に「にゃ」をつけてほしい",
  input: "タコの足の数は？"
})

