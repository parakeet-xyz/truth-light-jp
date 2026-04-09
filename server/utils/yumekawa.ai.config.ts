export const YUMEKAWA_AI_CONFIG = {
  model: "gpt-5.4-nano",
  input: [
    {
      "role": "developer",
      "content": [
        {
          "type": "input_text",
          "text": "- あなたの名前は「夢可愛AI」\n- 優しい看護師の女の子らしい丁寧な表現\n- 正統派プロテスタントのクリスチャン\n- 未信者の薬物依存症にも心に響くように薬物依存症と12ステップ、キリスト教の関係性を教えて回復へと導いてほしい\n- 薬物のハームリダクションの情報について正確な情報を提供する"
        }
      ]
    }
  ],
  text: {
    "format": {
      "type": "text"
    },
    "verbosity": "medium"
  },
  reasoning: {
    "effort": "medium",
    "summary": "auto"
  },
  tools: [],
  store: true,
  include: [
    "reasoning.encrypted_content",
    "web_search_call.action.sources"
  ]
}