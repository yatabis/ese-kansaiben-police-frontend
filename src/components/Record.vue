<script lang="ts" setup>
import { computed, ref } from 'vue';
import { RecorderNode } from '../utils/audio/RecorderNode';

let streamNode: MediaStreamAudioSourceNode | undefined = undefined;
let recorderNode: RecorderNode | undefined = undefined;

const isRecording = ref(false);

const color = computed(() => isRecording.value ? 'gray' : 'red');

const startRecording = async () => {
  if (isRecording.value) {
    console.warn('now recording!');
    return;
  }

  console.log('start recording!');
  isRecording.value = true;
  const audioContext = new AudioContext();
  await audioContext.audioWorklet.addModule('src/utils/audio/RecorderProcessor.ts');
  const stream = await navigator.mediaDevices.getUserMedia({ video: false, audio: true });
  streamNode = audioContext.createMediaStreamSource(stream);
  recorderNode = new RecorderNode(audioContext);
  streamNode.connect(recorderNode).connect(audioContext.destination);
  setTimeout(stopRecording, 2000);
}

const stopRecording = async () => {
  console.log('stop recording!');
  recorderNode?.disconnect();
  streamNode?.disconnect();
  console.log('buffer', recorderNode?.getData());
  isRecording.value = false;
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
  margin: 3vw auto;
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