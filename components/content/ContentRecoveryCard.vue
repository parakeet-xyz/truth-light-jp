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
</template>