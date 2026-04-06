<template>
  <!-- Substancesページ用ヘッダー -->
  <header 
   v-if="variant === `substances`"
   class="top-0 z-50">
    <div class="relative h-16 mx-auto px-10 flex flex-row items-center justify-between">
      <div class="md:hidden w-[34px] h-[34px]"><LayoutHeaderMobileNav /></div>
      <div><LayoutHeaderLogo :subtitle="subtitle" :variant="variant" /></div>
      <div class="h-full hidden md:inline-block"><LayoutHeaderNav :variant="variant" /></div>
      <div class=""><LayoutHeaderSocialLink /></div>
    </div>

    <div
      v-show="open"
      class="fixed inset-0 z-40 bg-black/20 md:hidden"
      @click="close"
      aria-hidden="true"
    ></div>
  </header>

  <!-- その他ヘッダー -->
  <header v-else
    class="z-50"
  >
    <div class="relative h-16 mx-auto px-6 flex flex-row max-w-6xl items-center justify-between">

      <div class="md:hidden"><LayoutHeaderMobileNav /></div>
      <div><LayoutHeaderLogo :subtitle="subtitle" /></div>
      <div class="h-full hidden md:inline"><LayoutHeaderNav :variant="variant" /></div>
      <div><LayoutHeaderSocialLink /></div>
      
    </div>

    <div
      v-show="open"
      class="fixed inset-0 z-40 bg-black/20 md:hidden"
      @click="close"
      aria-hidden="true"
    ></div>
  </header>

</template>

<script setup lang="ts">
import { ref } from "vue"
const open = ref(false)
const toggle = () => (open.value = !open.value)
const close = () => (open.value = false)

const props = defineProps<{
  variant?: "default" | "substances",
}>()
const variant = computed(() => props.variant ?? "default")


const headerClass = computed(() => {
  const base = "flex item-center bg-background/80 bg-slate-900 sticky z-40 backdrop-blur-lg border-teal-400"
  const variableClass =
    props.variant === "default"
    ? "h-20 border-b-4"
    : props.variant === "substances"
      ? "h-14 border-b"
      : "h-20 border-b-4"
  return [base, variableClass].join(" ")
})

const subtitle = computed(() => {
  if (props.variant === "default") {
    return ""
  } else if (props.variant === "substances") {
    return "規制物質データベース"
  } else {
    return ""
  }
})

const appConfig = useAppConfig();

const route = useRoute();

</script>
