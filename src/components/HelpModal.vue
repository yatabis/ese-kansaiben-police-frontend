<script lang="ts" setup>
</script>

<template>
<div class="modal-background" @click="$emit('close')"></div>
<div class="help-modal">
  <p>
    <span class="line">こちらエセ関西弁警察です</span>
  </p>
  <p>
    <span class="line">あなたの「なんでやねん」が</span>
    <span class="line">ネイティブ関西弁かエセ関西弁かを</span>
    <span class="line">判定します</span>
  </p>
  <p>
    <span class="line">録音ボタンをタップすると</span>
    <span class="line">3秒間の音声を</span>
    <span class="line">録音しますので</span>
    <span class="line">「なんでやねん」と</span>
    <span class="line">発声してください</span>
  </p>
</div>
</template>

<style scoped>
.modal-background {
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  height: 100dvh;
  background-color: black;
  opacity: 0.2;
}

.help-modal {
  position: absolute;
  top: 25vh;
  top: 25dvh;
  left: 10vw;
  width: 80vw;
  height: 50vh;
  height: 50dvh;
  margin: auto;
  padding: 16px;
  box-sizing: border-box;
  background-color: white;
  text-align: center;
}

.line {
  display: inline-block;
}
</style>