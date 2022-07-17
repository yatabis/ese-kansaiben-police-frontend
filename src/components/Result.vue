<script lang="ts" setup>
import { computed } from 'vue';
import { RESULT_TYPE, ResultResponse } from '~/interfaces/result.d';

const props = defineProps<{
  result: ResultResponse,
}>();

const resultText = computed(() => {
  switch (props.result?.result) {
    case RESULT_TYPE.KANSAI:
      return '関西弁';
    case RESULT_TYPE.ESE:
      return 'エセ関西弁';
  }
})

const resultDescription = computed(() => {
  return 'あなたはそこそこネイティブな関西弁の持ち主です。'
})

</script>

<template>
<div>
  <h3>あなたの「なんでやねん」は...</h3>
  <p class="result">
    <span class="result-title">{{ resultText }}</span>
    <span>です</span>
  </p>
  <div class="result-table">
    <span>関西弁度</span>
    <span>{{ result.kansai.toFixed(1) }}%</span>
    <span>エセ関西弁度</span>
    <span>{{ result.ese.toFixed(1) }}%</span>
  </div>
  <p>{{ resultDescription }}</p>
</div>
</template>

<style scoped>
.result {
  display: flex;
  width: 100%;
  justify-content: space-evenly;
  align-items: baseline;
}

.result-title {
  font-size: 2em;
  font-weight: bold;
  text-align: center;
}

.result-table {
  display: grid;
  grid-template-rows: 1fr 1fr;
  grid-template-columns: 1fr 1fr;
}
</style>
