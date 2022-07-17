<script lang="ts" setup>
import { computed, ref } from 'vue';
import { RecorderNode } from '~/utils/audio/RecorderNode';

const emit = defineEmits<{
  (e: 'help'): void
  (e: 'record', audioData: Float32Array | null): void
}>();

let audioContext: AudioContext | undefined;
let streamNode: MediaStreamAudioSourceNode | undefined;
let recorderNode: RecorderNode | undefined;

const isRecording = ref(false);

const color = computed(() => isRecording.value ? 'gray' : 'red');

const checkHelp = () => {
  const help = localStorage.getItem('help');
  if (!help || help !== 'true') {
    localStorage.setItem('help', 'true');
    return true;
  }
  return false;
}

const startRecording = async () => {
  if (isRecording.value) {
    console.warn('now recording!');
    return;
  }

  if (checkHelp()) {
    emit('help');
    return;
  }

  console.log('start recording!');
  isRecording.value = true;
  emit('record', null);
  audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('/RecorderProcessor.js');
  const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
  streamNode = audioContext.createMediaStreamSource(stream);
  recorderNode = new RecorderNode(audioContext);
  streamNode.connect(recorderNode).connect(audioContext.destination);
  setTimeout(stopRecording, 2000);
}

const stopRecording = async () => {
  recorderNode?.disconnect();
  streamNode?.disconnect();
  const data = recorderNode?.getData();
  if (data) {
    emit('record', data);
  }
  isRecording.value = false;
  console.log('stop recording!');
}
</script>

<template>
  <div class="rec-button" :style="{ 'border-color': color }" @click="startRecording">
    <span class="rec-icon material-symbols-outlined" :style="{ 'background-color': color }">mic</span>
  </div>
</template>

<style scoped>
.rec-button {
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 5vw auto;
  width: 64px;
  height: 64px;
  border-width: 3px;
  border-style: solid;
  border-radius: 50%;
  cursor: pointer;
}

.rec-icon {
  font-size: 48px;
  color: white;
  background-color: red;
  padding: 5px;
  border-radius: 50%;
}
</style>