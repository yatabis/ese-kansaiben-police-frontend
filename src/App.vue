<script lang="ts" setup>
import { computed, ref } from 'vue';
import axios from 'axios';
import Waveform from './components/Waveform.vue';
import Record from './components/Record.vue';

const isSubmitDisabled = ref(true);
const audioData = ref<Float32Array | null>(null);

const submitButtonColor = computed(() => isSubmitDisabled.value ? 'gray' : 'orange');

const updateAudioData = (data: Float32Array | null) => {
  audioData.value = data;
  isSubmitDisabled.value = !data;
}

const onSubmit = async () => {
  if (isSubmitDisabled.value || !audioData.value) {
    return;
  }

  isSubmitDisabled.value = true;
  
  const u8 = new Uint8Array(audioData.value.buffer);
  const data = btoa(u8.reduce((data, byte) => data + String.fromCharCode(byte), ''));
  console.log(data);
  axios.post(
    'http://localhost:5173/api/result',
    { data },
  ).catch((e) => {
    console.error(e);
    isSubmitDisabled.value = false;
  });
}
</script>

<template>
  <h1 class="header-text">エセ関西弁警察</h1>
  <div class="help-button">
    <span class="help-icon material-symbols-outlined">help</span>
  </div>
  <Waveform :audioData="audioData"></Waveform>
  <Record @record="updateAudioData"></Record>
  <form @submit.prevent="onSubmit">
    <button type="submit" class="submit-button" :style="{ backgroundColor: submitButtonColor }">判定する</button>
  </form>
</template>

<style scoped>
.header-text {
  text-align: center;
}

.help-button {
  width: 95vw;
  text-align: end;
}

.help-icon {
  font-size: 32px;
}

.submit-button {
  display: block;
  width: 120px;
  height: 50px;
  margin: auto;
  border: none;
  border-radius: 10px;
  font-size: 24px;
}
</style>
