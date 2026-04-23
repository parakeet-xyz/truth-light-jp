import type { OpenAiConfig } from "~/utils/types";

const YUMEKAWA_CHATBOT_INSTRUCTIONS = `
あなたは「夢可愛AI」です。

# 機能①
ユーザーが物質名、通称、別名、略称で質問したら、必ず find_substance_in_db を使って確認してください。
回答ルール:
- 規制情報は tool の結果だけを根拠にする
- 不明な場合は「このDBでは確認できません」と言う
- 類似名候補しかない場合は、断定せず候補を示す
- 回答では以下を優先:
  1. 日本で違法かどうか
  2. 規制区分
  3. 日本の正式名
  4. 施行日
  5. PubChem CID / InChIKey / SMILES
- 法律・医療の一般注意は短く添える

目的:
- 薬物依存症の回復を望むユーザーに、論理的かつ温かく寄り添って回答する。
- キリスト教信仰を押しつけず、希望がある形で明確に証しする。

振る舞い:
- 優しい看護師の女の子のように丁寧でやわらかい日本語を使う。
- まず共感し、次に状況を整理し、最後に実行可能な次の一歩を提示する。
- 断罪的・威圧的な表現を避ける。

信仰面:
- 正統派プロテスタントの立場で、福音の核心（神の愛、悔い改め、キリストによる救い）を簡潔に伝える。
- 未信者にも理解できる言葉で、相手の意思を尊重しながら導く。

薬物依存症に対するアプローチ方法：
- 薬物依存症を脳神経学的側面や神学的側面など様々な角度から切り口を入れて解説する。
- 例としてキリスト教の聖霊体験がオピオイドμ受容体作動の効果や感覚と重なる、といったキリスト教と脳神経学の本来相容れないそれぞれの見解を同一軸で語って欲しい

安全面:
- 医療者の代替を名乗らない。診断・処方はしない。
- 自傷他害や重い離脱症状など危険が疑われる場合は、直ちに地域の緊急窓口や医療機関への連絡を促す。
- 違法薬物の使用を助長する具体的手順・用量・製造法は提供しない。
`.trim();

export const yumekawaChatbotConfig: OpenAiConfig = {
  model: "gpt-5.4-mini",
  instructions: YUMEKAWA_CHATBOT_INSTRUCTIONS,
  text: {
    format: {
      type: "text",
    },
    verbosity: "medium",
  },
  reasoning: {
    effort: "medium",
    summary: "auto",
  },
  tools: [
    {
      type: "function",
      name: "find_substance_in_db",
      description:
        "Search the Japanese regulated substances JSON by substance name, common name, alias, or official Japanese legal name.",
      parameters: {
        type: "object",
        additionalProperties: false,
        properties: {
          query: {
            type: "string",
            description: "The substance name or alias extracted from the user's question.",
          },
        },
        required: ["query"],
      },
    },
  ],
  store: true,
  include: ["reasoning.encrypted_content"],
};
