<script lang="ts" setup>
import Waveform from './components/Waveform.vue';
import Record from './components/Record.vue';
</script>

<template>
  <h1 class="header-text"><span>あんたのそれ、</span><span>エセ関西弁やで</span></h1>
  <div class="help-button">
    <span class="help-icon material-symbols-outlined">help</span>
  </div>
  <Waveform></Waveform>
  <Record></Record>
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
