<template>
    <!-- デフォルトページ用 -->
    <footer v-if="props.variant === `substances`" class="pb-4">
        <p class="text-slate-300 text-center">{{ copyright }}</p>
    </footer>

    <footer v-else class="pb-4 bg-[#BFC9D1] border-t border-[#EAEFEF]/20">
        <div class="mx-auto max-w-6xl px-6 py-10">
        <div class="grid gap-8 md:grid-cols-3">
            <div>
                <p class="text-sm custom-font-bold">Truth Light</p>
                <p class="mt-2 text-sm">
                    Truth Lightは薬物に対する正しい情報と依存症からの回復の道を提供します。
                </p>
            </div>

            <div class="text-sm text-slate-300">
            <p class="font-semibold text-slate-100">Links</p>
                <div class="mt-2 space-y-2">
                    <a class="block hover:text-white" href="/docs/info/about">About</a>
                    <a class="block hover:text-white" href="/docs/info/disclaimer">Disclaimer</a>
                </div>
            </div>

            <div class="text-sm text-slate-300">
                <p class="font-semibold text-slate-100">Transparency</p>
                <div class="mt-2 space-y-2">
                    <a class="block hover:text-white" href="/sources">Data sources</a>
                    <a class="block hover:text-white" href="/updates">Update policy</a>
                    <a class="block hover:text-white" href="/contact">Contact</a>
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
  variant?: "default" | "substances" | "legal",
}>()

const appConfig = useAppConfig()

const footer = appConfig.truthlight?.footer
const copyright = footer.credits
</script>