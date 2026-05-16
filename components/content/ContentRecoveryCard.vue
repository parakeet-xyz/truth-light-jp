<script setup lang="ts">
const props = defineProps<{
  substanceName?: string
}>()

const substanceName = props.substanceName ?? '薬物'
</script>

<template>
  <div class="yumekawa-manga flex flex-row items-end">
    <div class="flex flex-1 flex-row items-center justify-end">
      <div class="flex flex-col w-[70%] min-h-16 rounded-lg bg-[#DDE4E7] px-3 py-2 items-center justify-center">
        <p class="m-0">{{ substanceName }}が止めれなくて困っていませんか？</p>
        <p>→→ {{ substanceName }}依存症からの回復方法について知る ←←</p>
      </div>
      <div class="flex-none">
        <img
          src="/yumekawa-manga/fukidashi-right-h128px.png"
          alt="吹き出し"
          class="h-16 w-auto"
        />
      </div>
    </div>
    <div class="flex-none">
      <img
        src="/yumekawa-manga/yumekawa-ai-02-128px.png"
        alt="夢可愛アイ"
        class="w-16 h-16"
      />
    </div>
  </div>
</template>