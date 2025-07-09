<template>
  <div :class="$style.app">
    <ThreeScene />
  </div>
</template>

<script setup lang="ts">
import ThreeScene from './components/ThreeScene.vue'
</script>

<style module>
.app {
  width: 100vw;
  height: 100vh;
  position: relative;
}
</style>

<style>
body {
  margin: 0;
  padding: 0;
  overflow: hidden;
}
</style> 