<script setup lang="ts">
const props = defineProps<{
  substanceName?: string
}>()

const substanceName = props.substanceName ?? '薬物'
</script>

<template>
  <section class="flex flex-row">
    <div><img src="yumekawa-ai/yumekawa-ai-01.png" alt="夢可愛AI アイコン" /></div>
    <div>
      <p>{{ substanceName }}がやめれなくて困っていませんか？<br />Truth Lightでは薬物依存症からの回復の道を提供しています。</p>
      <p><NuxtLink :to="{name: 'docs/recovery'}" /></p>
    </div>
  </section>

  <div class="yumekawa-manga flex flex-row items-end">
    <div class="flex flex-1 flex-row items-center justify-end">
      <div class="flex flex-col w-[70%] min-h-16 rounded-lg bg-[#DDE4E7] px-3 py-2 items-center justify-center">
        <p class="m-0">{{ substanceName }}がやめれなくて困っていませんか？<br />Truth Lightでは薬物依存症からの回復の道を提供しています。</p>
        <p><NuxtLink :to="{name: 'docs/recovery'}" /></p>
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