<script setup lang="ts">
import type { YumekawaChatRequest, YumekawaChatMessage, YumekawaChatResponse } from '~/utils/interfaces';

type Emits = {
  closeForm: []
}


const emit = defineEmits<Emits>()
const handleClickCloseButton = (): void => {
  emit('closeForm')
}

const prompt = ref('')
const msgs = ref<YumekawaChatMessage[]>([])
let counter: number = 0

msgs.value[counter] = {
  id: counter,
  role: 'assistant',
  content: 'はじめまして！夢可愛AIです！<br />最初に夢可愛AI利用規約をご確認くださいね。',
  format: "html",
  substanceCard: null,
}

counter++

msgs.value[counter] = {
  id: counter,
  role: 'assistant',
  content: '<p class="mb-2 text-gray-800">何について知りたいですか？</p><div class="space-y-2"><button type="button" class="w-full rounded-lg bg-gray-100 p-2 text-left custom-font-bold text-gray-600">薬物依存症回復プログラム「12ステップ」について</button><button type="button" class="w-full rounded-lg bg-gray-100 p-2 text-left custom-font-bold text-gray-600">依存症とキリスト教の関係について</button><button type="button" class="w-full rounded-lg bg-gray-100 p-2 text-left custom-font-bold text-gray-600">薬物の規制状況について</button><button type="button" class="w-full rounded-lg bg-gray-100 p-2 text-left custom-font-bold text-gray-600">🐘✒️の危険性について</button></div>',
  format: "html",
  substanceCard: null,
}

counter++

const submitPrompt = async (text: string): Promise<void> => {
  if (!text.trim()) return

  msgs.value.push({
    id: counter,
    role: 'user',
    content: text,
    format: "plain",
    substanceCard: null,
  })

  const req: YumekawaChatRequest = {
    message: text,
    history: msgs.value ? msgs.value : []
  }

  const res = await $fetch('/api/chatbot/yumekawa-chatbot',{method: 'POST', body: req}) as YumekawaChatResponse

  counter++

  msgs.value.push({
    id: counter,
    role: 'assistant',
    content: res.reply,
    format: "markdown",
    substanceCard: res.substanceCard ?? null
  })

  prompt.value = ''
}

</script>

<template>
<div
  class="flex flex-col w-[420px] max-w-[calc(100vw-2rem)] h-[calc(100vh-2rem)] overflow-hidden
  rounded-xl border border-[#cdd7e0] bg-white/80 shadow-2xl"
>
  <!-- ヘッダー -->
  <div class="flex items-center justify-between shrink-0
    bg-[#FF9B51] px-4 py-2 text-white"
  >
    <span class="text-base custom-font-bold">夢可愛AIに質問</span>
    <button type="button" class="hover:opacity-80"
      @click="handleClickCloseButton"
    >
      <img src="/ui/close-white.png" alt="チャットを閉じる" class="w-4 h-4" /></button>
  </div>

  <!-- メッセージエリア -->
  <div
    class="flex-1 overflow-y-auto bg-[#EAEFEF]/80 px-4 py-4
      text-xs leading-tight"
  >

    <ChatbotBubble 
      v-for="msg in msgs"
      :key="msg.id"
      :id="msg.id"
      :role="msg.role"
      :content="msg.content"
      :format="msg.format"
      :substance-card="msg.substanceCard"
    />

  </div>

  <!-- 入力エリア -->
  <div class="shrink-0 min-h-24 border-t border-[#FF9B51] bg-white/80 p-2">
    <div class="flex items-end gap-3">
      <textarea
        rows="3"
        placeholder="夢可愛AIに何でも質問"
        class="min-h-[80px] flex-1 resize-none rounded-md p-1 text-xs text-gray-600 placeholder:text-gray-300 focus:outline-none"
        v-model="prompt"
      ></textarea>

      <button
        type="button"
        class="rounded-lg bg-[#FF9B51] p-2 text-base custom-font-bold text-white hover:bg-[#ffaf74]"
        @click="submitPrompt(prompt)"
      >
        送信
      </button>
    </div>
  </div>
</div>
</template>