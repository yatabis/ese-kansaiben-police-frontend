<script lang="ts" setup>
import { computed, onMounted, ref } from 'vue';

const isRecording = ref(false);

const color = computed(() => isRecording.value ? 'gray' : 'red');

const startRecording = async () => {
  if (isRecording.value) {
    console.warn('now recording!');
    return;
  }

  console.log('start recording!');
  isRecording.value = true;
  setTimeout(stopRecording, 2100);
}

const stopRecording = async () => {
  console.log('stop recording!');
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