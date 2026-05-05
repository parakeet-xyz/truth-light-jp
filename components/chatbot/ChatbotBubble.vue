<script setup lang="ts">
import MarkdownIt from "markdown-it"
import type { YumekawaChatMessage } from "~/utils/interfaces"

const props = defineProps<YumekawaChatMessage>()

const emit = defineEmits<{
  selectOption: [value: string]
}>()

const md = new MarkdownIt({
  html: false,
  breaks: true,
  linkify: true,
})

const renderedHtml = computed(() => {
  if (props.format === "markdown") {
    return md.render(props.content ?? "")
  }

  if (props.format === "html") {
    return props.content ?? ""
  }

  return ""
})

const isMarkdown = computed(() => props.format === "markdown")

const isOptions = computed(() => props.format === "options")

const handleClickOption = (value: string): void => {
  emit("selectOption", value)
}
</script>

<template>
  <!-- Assistantメッセージ -->
  <div
    v-if="role === 'assistant'"
    class="flex flex-row items-start mb-6 gap-2"
  >
    <div class="shrink-0 h-10 w-10 overflow-hidden rounded-full">
      <img
        src="/yumekawa-ai/yumekawa-ai-128px.png"
        alt="アイコン"
        class="h-full w-full object-cover"
      />
    </div>

    <div
      class="flex-1"
      :class="props.substanceCard ? 'flex flex-col' : ''"
    >
      <!-- サブスタンスカード -->
      <div
        v-if="props.substanceCard"
        class="rounded-xl bg-white mb-4 px-4 py-4 shadow-sm"
      >
        <ChatbotSubstanceCard
          v-bind="props.substanceCard"
        />
      </div>

      <div class="rounded-xl bg-white px-4 py-4 shadow-sm">
        <p class="mb-2 custom-font-bold text-gray-400">夢可愛AI</p>

        <!-- options形式 -->
        <div v-if="isOptions">
          <p class="mb-2 text-gray-800">
            {{ props.content }}
          </p>

          <div class="space-y-2">
            <button
              v-for="option in props.options"
              :key="option.value"
              type="button"
              class="w-full rounded-lg bg-gray-100 p-2 text-left custom-font-bold text-gray-600 hover:bg-gray-200"
              @click="handleClickOption(option.value)"
            >
              {{ option.label }}
            </button>
          </div>
        </div>

        <!-- markdown / html形式 -->
        <div
          v-else-if="props.format === 'markdown' || props.format === 'html'"
          v-html="renderedHtml"
          class="text-gray-800"
          :class="isMarkdown ? 'chat-markdown' : ''"
        />

        <!-- plain形式 -->
        <div
          v-else
          class="text-gray-800 whitespace-pre-wrap"
        >
          {{ props.content }}
        </div>
      </div>
    </div>
  </div>

  <!-- Userメッセージ -->
  <div
    v-else
    class="relative flex items-end justify-end mb-6"
  >
    <div class="w-full rounded-l-lg rounded-tr-lg bg-[#FF9B51] px-4 py-4 shadow-sm text-white whitespace-pre-wrap">
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

<style lang="css" scoped>
.chat-markdown :deep(p) {
  margin-bottom: 0.5rem;
}

.chat-markdown :deep(p:first-child) {
  margin-top: 0;
}

.chat-markdown :deep(p:last-child) {
  margin-bottom: 0;
}

.chat-markdown :deep(ul),
.chat-markdown :deep(ol) {
  padding-left: 1.25rem;
  margin: 0.5rem 0;
}

.chat-markdown :deep(li) {
  margin: 0.25rem 0;
}

.chat-markdown :deep(code) {
  padding: 0.15rem 0.35rem;
  border-radius: 0.375rem;
  background: rgba(191, 201, 209, 0.28);
  font-size: 0.875em;
}

.chat-markdown :deep(strong) {
  font-weight: 700;
}
</style>