<script lang="ts" setup>
import { ref } from 'vue';
import Waveform from './components/Waveform.vue';
import Record from './components/Record.vue';

let audioData = ref<Float32Array | null>(null);

const updateAudioData = (data: Float32Array) => {
  audioData.value = data;
}
</script>

<template>
  <h1 class="header-text"><span>あんたのそれ、</span><span>エセ関西弁やで</span></h1>
  <div class="help-button">
    <span class="help-icon material-symbols-outlined">help</span>
  </div>
  <Waveform :audioData="audioData"></Waveform>
  <Record @record="updateAudioData"></Record>
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
</style>
