<script setup lang="ts">
import type { SubstanceCardData } from '~/utils/interfaces';
const props = defineProps<SubstanceCardData>()


</script>

<template>
  <div class="mb-3">
    <p class="text-xs custom-font-bold text-gray-400">規制物質DB</p>
    <h3 class="text-base custom-font-bold leading-snug">{{ props.title }}</h3>
    <p v-if="props.commonName && props.commonName !== props.title" class="mt-1 text-sm text-gray-600">
      {{ props.commonName }}
    </p>
  </div>

  <div class="grid grid-cols-1 gap-3">
    <div v-if="props.lawCategory">
      <p class="custom-font-bold text-gray-500">規制区分</p>
      <p>{{ props.lawCategory }}</p>
    </div>

    <div v-if="props.officialName">
      <p class="custom-font-bold text-gray-500">公式名</p>
      <p class="break-words">{{ props.officialName }}</p>
    </div>

    <div v-if="props.effectiveDate">
      <p class="custom-font-bold text-gray-500">効力発生日</p>
      <p>{{ props.effectiveDate }}</p>
    </div>

    <div v-if="props.systematicName">
      <p class="custom-font-bold text-gray-500">系統名</p>
      <p class="break-words">{{ props.systematicName }}</p>
    </div>

    <div v-if="props.pubchemCid">
      <p class="custom-font-bold text-gray-500">PubChem CID</p>
      <p>{{ props.pubchemCid }}</p>
    </div>

    <div v-if="props.inchiKey">
      <p class="custom-font-bold text-gray-500">InChIKey</p>
      <p class="break-all">{{ props.inchiKey }}</p>
    </div>

    <div v-if="props.smiles">
      <p class="custom-font-bold text-gray-500">SMILES</p>
      <p class="break-all font-mono text-xs">{{ props.smiles }}</p>
    </div>

    <div v-if="props.sourceLink">
      <a
        :href="props.sourceLink"
        target="_blank"
        rel="noopener noreferrer"
        class="inline-block text-sm custom-font-bold
        text-[#FF9B51] underline"
      >
        法令ソースを見る
      </a>
    </div>
  </div>
</template>