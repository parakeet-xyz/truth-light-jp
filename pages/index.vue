<template>
  <main>
    <!-- AI検索 -->
    <section class="mx-auto max-w-6xl px-6 pb-10 pt-16">
      <div class="pb-10">
        <h1 class="pb-10 text-3xl md:text-5xl custom-font-bold tracking-tight text-center">日本版Erowidを目指して。</h1>
        <p class="w-[60%] mx-auto text-lg md:text-xl text-[#25343F]/70 tracking-tight text-center text-balance leading-50">Truth Lightはあらゆる精神活性物質の作用・副作用・危険性<br>そして薬物依存症からの回復の方法まで正しい情報を提供します。</p>
      </div>
      <section class="">
        <h2 class="text-xl text-center">規制情報、ハームリダクション、薬物依存症からの回復についてAIに聞く</h2>
        <div class="flex gap-4">
          <button type="button" class="inline-flex text-lg">テキストで聞く</button>
          <button type="button" class="inline-flex text-lg">構造式で聞く</button>         
        </div>
        <input type="text" id="aiTextSearch" name="aiTextSearch" placeholder="ex. MDPVって規制されてる？"
          class="border-2 border"
        />
      </section>
      <div>
        <h2>構造式検索</h2>
          <ClientOnly>
            <ContentKetcherFrame />
          </ClientOnly>          
      </div>
    </section>

  </main>

</template>

<script setup lang="ts">
import ContentKetcherFrame from '~/components/content/KetcherFrame.vue'

definePageMeta({ layout: "default" })

const appConfig = useAppConfig()
useHead({
  titleTemplate: null,
})
useSeoMeta({
  title: appConfig.truthlight?.site?.name ?? `Truth Light`,
  description: appConfig.truthlight?.site?.description ?? ``,
})

</script>