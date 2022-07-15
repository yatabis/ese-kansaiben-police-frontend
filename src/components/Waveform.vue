<script lang="ts" setup>
import { computed, ref, watchEffect } from 'vue';

const props = defineProps<{
  audioData: Float32Array | null
}>();

const canvas = ref<HTMLCanvasElement | null>(null);

const ctx = computed(() => canvas.value?.getContext('2d'));

const drawWaveform = (data: Float32Array | null) => {
  if (!ctx.value) {
    return;
  }
  console.log('draw');
  ctx.value.fillStyle = 'skyblue';
  ctx.value.fillRect(0, 0, 882, 256);
  if (!data) {
    return;
  }
  ctx.value.strokeStyle = 'deeppink';
  ctx.value.beginPath();
  ctx.value.moveTo(0, 128);
  data.forEach((value, i) => {
    ctx.value?.lineTo(i / 100, value * 128 + 128);
  })
  ctx.value.stroke();
}

watchEffect(() => {
  drawWaveform(props.audioData);
})
</script>

<template>
  <canvas width="882" height="256" class="waveform" ref="canvas">{{ audioData?.length }}</canvas>
</template>

<style scoped>
.waveform {
  display: block;
  width: 90vw;
  aspect-ratio: 2;
  margin: auto;
}
</style>
