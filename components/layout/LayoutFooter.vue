<template>
    <!-- サブスタンス検索用 -->
    <footer v-if="props.variant === `substances`" class="pb-4">
        <p class="text-slate-300 text-center">{{ copyright }}</p>
    </footer>

    <!-- デフォルトページ用 -->
    <footer v-else class="pb-4 bg-[#BFC9D1] border-t border-[#EAEFEF]/20">
        <div class="mx-auto max-w-6xl px-6 py-10">
            <div class="grid gap-8 md:grid-cols-3">
                <div>
                    <p class="text-sm custom-font-bold">Truth Light</p>
                    <p class="mt-2 text-sm">
                        Truth Lightは薬物に対する正しい情報と依存症からの回復の道を提供します。
                    </p>
                </div>

                <div class="text-sm">
                <p class="custom-font-bold">リンク</p>
                    <div class="mt-2 space-y-2">
                        <a v-for="link in links"
                          class="block text-[#25343F]/70 hover:text-[#FF9B51]"
                          :href="link.to"
                          :target="link.target"
                        >
                          {{ link.title }}
                        </a>
                    </div>
                </div>

                <div class="text-sm">
                    <p class="custom-font-bold">外部リソース</p>
                    <div class="mt-2 space-y-2">
                        <a v-for="resource in resources"
                          class="block text-[#25343F]/70 hover:text-[#FF9B51]"
                          :href="resource.to"
                          :target="resource.target"
                        >
                          {{resource.title}}
                        </a>
                    </div>
                </div>
            </div>

            <p class="mt-10 text-xs text-slate-500">
                © <span id="year"></span> Truth Light. All rights reserved.
            </p>
        </div>
    </footer>


</template>

<script setup lang="ts">
const props = defineProps<{
  variant?: "default" | "substances",
}>()

const appConfig = useAppConfig()

const site = appConfig.truthlight?.site ?? ''

const footer = appConfig.truthlight?.footer ?? ''
const links = footer.links ?? ''
const resources = footer.resources ?? ''

const copyright = footer.credits
</script>