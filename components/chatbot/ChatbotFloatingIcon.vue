<script setup lang="ts">
const isHover = ref(false)
const isClick = ref(false)
const isIconHidden = ref(false)

let timeCounterID: ReturnType<typeof setTimeout> | null = null

const handleMouseEnter = (): void => {
  isHover.value = true
}
const handleMouseLeave = (): void => {
  isHover.value = false
}
const handleClickIcon = (): void => {
  isClick.value = true

  if (timeCounterID) {
    clearTimeout(timeCounterID)
  }

  timeCounterID = setTimeout(() => {
    isIconHidden.value = true
  }, 200)
}
</script>

<template>
<div
  class="fixed right-4 bottom-4 h-16 z-50 flex flex-row items-end
    transition-transform duration-200 ease-in-out"
  :class="isClick ? 'translate-y-24' : '-translate-y-0'"
>
  <span
    class="flex h-[64px] w-[300px] items-center pl-2 text-xs leading-tight
      bg-[url('/yumekawa-ai/fukidashi-h128px.png')] bg-contain bg-center bg-no-repeat
      drop-shadow-lg transition-opacity duration-20 ease-in-out"
    :class="isHover ? 'opacity-100' : 'opacity-0'"
  >
    <span class="inline-block">
      薬物の規制情報やハームリダクション<br />
      依存症からの回復などお気軽にご相談くださいね🧡
    </span>
  </span>

  <span
    class="inline-flex
      transition-transform duration-200 ease-in-out hover:scale-110 cursor-pointer"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @click="handleClickIcon"
  >
    <img
      src="/yumekawa-ai/yumekawa-ai-128px.png"
      alt="夢可愛AIに質問する"
      class="h-[64px] animate-radar drop-shadow-lg select-none"
    />
  </span>
</div>

<div
  class="fixed right-4 bottom-4 z-40
    transition-transform duration-200 ease-in-out"
  :class="isIconHidden ? 'block -translate-y-0' : 'hidden translate-y-full'">
  <ChatbotMinimalForm />
</div>
</template>