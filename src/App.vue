<script lang="ts" setup>
import { ref } from 'vue';
import axios from 'axios';
import Waveform from './components/Waveform.vue';
import Record from './components/Record.vue';

let audioData = ref<Float32Array | null>(null);

const updateAudioData = (data: Float32Array) => {
  audioData.value = data;
}

const onSubmit = async () => {
  if (!audioData.value) {
    return;
  }
  
  const u8 = new Uint8Array(audioData.value.buffer);
  const data = btoa(u8.reduce((data, byte) => data + String.fromCharCode(byte), ''));
  console.log(data);
  await axios.post(
    'http://localhost:5173/api/result',
    { data },
  );
}
</script>

<template>
  <h1 class="header-text"><span>あんたのそれ、</span><span>エセ関西弁やで</span></h1>
  <div class="help-button">
    <span class="help-icon material-symbols-outlined">help</span>
  </div>
  <Waveform :audioData="audioData"></Waveform>
  <Record @record="updateAudioData"></Record>
  <form @submit.prevent="onSubmit">
    <button type="submit" class="submit-button">判定する</button>
  </form>
</template>

<style scoped>
#app {
  font-family: 'Dela Gothic One', 'Noto Sans JP', sans-serif;
}

.header-text {
  text-align: center;
}

.header-text > span {
  display: inline-block;
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
  background-color: orange;
  border: none;
  border-radius: 10px;
  font-size: 24px;
}
</style>
