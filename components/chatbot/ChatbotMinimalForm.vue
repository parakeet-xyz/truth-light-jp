<script setup lang="ts">
</script>

<template>
<div class="fixed right-4 bottom-4 z-50 w-[400px] max-w-[calc(100vw-2rem)] overflow-hidden rounded-2xl border border-[#cdd7e0] bg-white/80 shadow-2xl">
  <!-- ヘッダー -->
  <div class="flex items-center justify-between bg-[#FF9B51] px-4 py-2 text-white">
    <span class="text-base custom-font-bold">夢可愛AIに聞く</span>
    <button type="button" class="hover:opacity-80"><img src="/ui/close-white.png" alt="チャットを閉じる" class="w-4 h-4" /></button>
  </div>

  <!-- メッセージエリア -->
  <div
    class="h-[500px] overflow-y-auto bg-[#EAEFEF]/90 px-4 py-5
      text-sm leading-tight"
  >

    <!-- AIメッセージ1 -->
    <div class="flex items-end mb-6 gap-2">
      <div class="h-12 w-12 shrink-0 overflow-hidden rounded-full">
        <img
          src="/yumekawa-ai/yumekawa-ai-128px.png"
          alt="アイコン"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="max-w-[300px] rounded-2xl bg-white px-4 py-4 shadow-sm">
        <p class="mb-2 custom-font-bold text-gray-400">夢可愛AI</p>
        <p class="text-gray-800">
          はじめまして！夢可愛AIです！<br />
          最初に夢可愛AI利用規約をご確認くださいね。
        </p>
      </div>
    </div>

    <!-- AIメッセージ2 -->
    <div class="flex items-end mb-6 gap-2">
      <div class="h-12 w-12 shrink-0 overflow-hidden rounded-full">
        <img
          src="/yumekawa-ai/yumekawa-ai-128px.png"
          alt="アイコン"
          class="h-full w-full object-cover"
        />
      </div>

      <div class="max-w-[300px] rounded-2xl bg-white px-4 py-4 shadow-sm
        text-sm"
      >
        <p class="mb-2 custom-font-bold text-gray-400">夢可愛AI</p>
        <p class="mb-2 text-gray-800">
          何について知りたいですか？
        </p>

        <div class="space-y-2">
          <button type="button" class="w-full rounded-xl bg-gray-100 p-2 text-left custom-font-bold text-gray-600">
            薬物依存症回復プログラム「12ステップ」について
          </button>
          <button type="button" class="w-full rounded-xl bg-gray-100 p-2 text-left custom-font-bold text-gray-600">
            依存症とキリスト教の関係について
          </button>
          <button type="button" class="w-full rounded-xl bg-gray-100 p-2 text-left custom-font-bold text-gray-600">
            薬物の規制状況について
          </button>
          <button type="button" class="w-full rounded-xl bg-gray-100 p-2 text-left custom-font-bold text-gray-600">
            🐘✒️の危険性について
          </button>
        </div>

      </div>
    </div>

  </div>

  <!-- 入力エリア -->
  <div class="border-t border-[#FF9B51] bg-white/80 p-2">
    <div class="flex items-end gap-3">
      <textarea
        rows="3"
        placeholder="ご質問いただくとAIが自動で回答を生成します。"
        class="min-h-[80px] flex-1 resize-none rounded-md p-1 text-sm text-gray-600 placeholder:text-gray-300 focus:outline-none"
      ></textarea>

      <button
        type="button"
        class="rounded-xl bg-[#FF9B51] p-2 text-sm custom-font-bold text-white hover:bg-[#ffaf74]"
      >
        送信
      </button>
    </div>
  </div>
</div>
</template>