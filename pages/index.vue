<template>
  <main>
    <!-- AI検索 -->
    <section class="mx-auto max-w-6xl px-6 pb-10 pt-16">
      <div class="pb-10">
        <h1 class="pb-10 text-3xl md:text-5xl custom-font-bold tracking-tight text-center">日本版Erowidを目指して。</h1>
        <p class="w-[60%] mx-auto text-lg md:text-xl text-[#25343F]/70 tracking-tight text-center text-balance leading-50">Truth Lightはあらゆる精神活性物質の作用・副作用・危険性<br>そして薬物依存症からの回復の方法まで正しい情報を提供します。</p>
      </div>
      <section class="">
        <div class="flex flex-col items-center mb-12 text-xl text-center">
          <div class="flex flex-row items-center justify-center mb-4 gap-4">
            <span class="inline-block h-40"><img src="/yumekawa-ai/yumekawa-ai-01.png" alt="夢可愛AI チャットボットアイコン" class="h-40" /></span>
            <span class="inline-block flex items-center h-40 aspect-[16/9] pl-12 pr-4 text-sm bg-[url('/yumekawa-ai/fukidashi.png')] bg-contain bg-no-repeat">
              薬物の規制情報<br />ハームリダクション<br />依存症の回復方法など何でも聞いてくださいね🧡
            </span>
          </div>
          <h2>規制情報、ハームリダクション、薬物依存症からの回復について夢可愛AIに聞く</h2>
        </div>
        <div class="flex gap-4 justify-center pb-10">
          <button
            v-for="t in tabs"
            :key="t.key"
            type="button"
            class="inline-flex p-1 text-lg rounded-lg border hover:text-[#EAEFEF] hover:bg-[#FF9B51] hover:border-[#FF9B51]"
            :class="activeTab === t.key
              ? 'text-[#EAEFEF] bg-[#FF9B51] border-[#FF9B51]'
              : 'text-[#25343F] bg-[#BFC9D1]/40 border-[#BFC9D1]/60'
            "
            @click="activeTab = t.key"
          >
            {{t.label}}
          </button>
        </div>
        <div
          v-if="activeTab === 'text'"
        >
          <input type="text" id="aiTextSearch" name="aiTextSearch" placeholder="ex. MDPVって規制されてる？"
            class="w-full h-12 px-4 text-lg border-2 rounded-xl placeholder:text-lg"
          />
        </div>
        <div
          v-else
        >
            <ClientOnly>
              <ContentKetcherFrame />
            </ClientOnly>          
        </div>
      </section>
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