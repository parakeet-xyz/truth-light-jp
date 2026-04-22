<script setup lang="ts">
const props = defineProps<{
  role: "user" | "assistant";
  content: string;
}>()
</script>

<template>
  <!-- AIメッセージ1 -->
  <div
    v-if="role === 'assistant'"
    class="flex items-start mb-6 gap-2"
  >
    <div class="h-10 w-10 shrink-0 overflow-hidden rounded-full">
      <img
        src="/yumekawa-ai/yumekawa-ai-128px.png"
        alt="アイコン"
        class="h-full w-full object-cover"
      />
    </div>

    <div class="max-w-[85%] rounded-xl bg-white px-4 py-4 shadow-sm">
      <p class="mb-2 custom-font-bold text-gray-400">夢可愛AI</p>
      <div
        v-html="props.content"
        class="text-gray-800">
      </div>
    </div>
  </div>

  <div
    v-else
    class="relative flex items-end justify-end mb-6"
  >

    <div class="w-full rounded-l-lg rounded-tr-lg bg-[#FF9B51] px-4 py-4 shadow-sm">
      {{ props.content }}
    </div>
    <div>
      <img
        src="/ui/fukidashi-orange.png"
        alt=""
        class="w-4 h-4"
      />
    </div>
  </div>


</template>