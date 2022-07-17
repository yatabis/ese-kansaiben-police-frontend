<script lang="ts" setup>
import { computed, ref } from 'vue';
import axios, { AxiosResponse } from 'axios';
import Waveform from '~/components/Waveform.vue';
import Record from '~/components/Record.vue';
import Result from '~/components/Result.vue';
import { ResultResponse } from '~/interfaces/result.d';

const isSubmitDisabled = ref(true);
const audioData = ref<Float32Array | null>(null);
const result = ref<ResultResponse | null>(null)

const submitButtonColor = computed(() => isSubmitDisabled.value ? 'gray' : 'orange');

const updateAudioData = (data: Float32Array | null) => {
  isSubmitDisabled.value = !data;
  audioData.value = data;
  result.value = null;
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
    import.meta.env.VITE_API_ENDPOINT,
    { data },
  )
  .then((response: AxiosResponse<ResultResponse>) => {
    result.value = response.data;
  })
  .catch((e) => {
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
  <Result :result="result"></Result>
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
