<template>
  <main>
    <!-- AI検索 -->
    <section class="mx-auto max-w-6xl px-6 pb-10 pt-16">
      <div class="mb-16">
        <h1 class="mb-8 text-3xl md:text-5xl custom-font-bold tracking-tight text-center">
          日本版Erowidを目指して。
        </h1>
        <h2 class="w-[60%] mx-auto text-lg md:text-xl text-[#25343F]/70 tracking-tight leading-12 text-center text-balance leading-50">
          Truth Lightはあらゆる精神活性物質の作用・副作用・危険性<br>そして薬物依存症からの回復の方法まで正しい情報を提供します。
        </h2>
      </div>
    </section>

  </main>

</template>

<script setup lang="ts">
import ContentKetcherFrame from '~/components/content/ContentKetcherFrame.vue'

definePageMeta({ layout: "default" })

const appConfig = useAppConfig()
const topPageDescription = appConfig.truthlight?.site?.topPageDescription ?? ``

useSeoMeta({
  description: topPageDescription,
  ogDescription: topPageDescription,
})

// Tabs
const tabs = [
  { key: "text", label: "テキストで聞く" },
  { key: "structure", label: "構造式で聞く"}
] as const

const activeTab = ref<(typeof tabs)[number]["key"]>("text")

</script>