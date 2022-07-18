<script lang="ts" setup>
import { computed, ref } from 'vue';
import axios, { AxiosResponse } from 'axios';
import Waveform from '~/components/Waveform.vue';
import Record from '~/components/Record.vue';
import Loading from '~/components/Loading.vue';
import Error from '~/components/Error.vue';
import Result from '~/components/Result.vue';
import HelpModal from './components/HelpModal.vue';
import { ResultResponse } from '~/interfaces/result.d';

const showHelp = ref(false);
const isSubmitDisabled = ref(true);
const isLoading = ref(false);
const isError = ref(false);
const audioData = ref<Float32Array | null>(null);
const result = ref<ResultResponse | null>(null)

const submitButtonColor = computed(() => isSubmitDisabled.value ? 'gray' : 'orange');

const help = () => {
  showHelp.value = true;
  localStorage.setItem('help', 'true');
}

const updateAudioData = (data: Float32Array | null) => {
  isSubmitDisabled.value = !data;
  isError.value = false;
  audioData.value = data;
  result.value = null;
}

const onSubmit = async () => {
  if (isSubmitDisabled.value || !audioData.value) {
    return;
  }

  isSubmitDisabled.value = true;
  isLoading.value = true;
  isError.value = false;
  
  const u8 = new Uint8Array(audioData.value.buffer);
  const data = window.btoa(u8.reduce((data, byte) => data + String.fromCharCode(byte), ''));
  axios.post(
    `${import.meta.env.VITE_API_ENDPOINT}/api/predict`,
    { data },
  )
  .then((response: AxiosResponse<ResultResponse>) => {
    result.value = response.data;
  })
  .catch((e) => {
    console.error(e);
    isSubmitDisabled.value = false;
    isError.value = true;
  })
  .finally(() => {
    isLoading.value = false;
  });
}
</script>

<template>
  <h1 class="header-text">エセ関西弁警察</h1>
  <div class="help-button" @click="help">
    <span class="help-icon material-symbols-outlined">help</span>
  </div>
  <Waveform :audioData="audioData"></Waveform>
  <Record @help="help" @record="updateAudioData"></Record>
  <form @submit.prevent="onSubmit">
    <button type="submit" class="submit-button" :style="{ backgroundColor: submitButtonColor }">判定する</button>
  </form>
  <Loading v-if="isLoading"></Loading>
  <Error v-else-if="isError"></Error>
  <Result v-else-if="result" :result="result"></Result>
  <HelpModal v-if="showHelp" @close="showHelp = false"></HelpModal>
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
  padding: 0;
  border: none;
  border-radius: 10px;
  font-family: 'Noto Sans JP', sans-serif;
  font-size: 24px;
}
</style>
