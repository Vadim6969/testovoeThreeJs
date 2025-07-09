<script setup lang="ts">
import { ref, onMounted, onUnmounted } from 'vue'
import { ThreeScene as ThreeSceneClass } from '../three'

const canvasRef = ref<HTMLCanvasElement>()

const doorHeight = ref(2.2)
const doorWidth = ref(0.9)

let threeScene: ThreeSceneClass

onMounted(() => {
  if (!canvasRef.value) return

  threeScene = new ThreeSceneClass(canvasRef.value)
  threeScene.animate()
  
  window.addEventListener('resize', handleResize)
})

onUnmounted(() => {
  if (threeScene) {
    threeScene.dispose()
  }
  window.removeEventListener('resize', handleResize)
})

const updateDoorSize = () => {
  if (!threeScene) return
  threeScene.updateDoorSize(doorWidth.value, doorHeight.value)
}

const handleResize = () => {
  if (!threeScene) return
  threeScene.handleResize()
}
</script>

<template>
  <div>
    <canvas ref="canvasRef" :class="$style.threeCanvas"></canvas>
    
    <div :class="$style.controls">
      <h3 :class="$style.controlsTitle">Параметры двери</h3>
      
      <div :class="$style.controlGroup">
        <label :class="$style.controlLabel">Высота двери:</label>
        <div :class="$style.sliderContainer">
          <input 
            type="range" 
            min="1.5" 
            max="4" 
            step="0.1" 
            v-model.number="doorHeight" 
            @input="updateDoorSize"
            :class="$style.rangeSlider"
          />
          <span :class="$style.valueDisplay">{{ doorHeight.toFixed(1) }}м</span>
        </div>
      </div>
      
      <div :class="$style.controlGroup">
        <label :class="$style.controlLabel">Ширина двери:</label>
        <div :class="$style.sliderContainer">
          <input 
            type="range" 
            min="0.6" 
            max="2" 
            step="0.1" 
            v-model.number="doorWidth" 
            @input="updateDoorSize"
            :class="$style.rangeSlider"
          />
          <span :class="$style.valueDisplay">{{ doorWidth.toFixed(1) }}м</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style module>
.threeCanvas {
  display: block;
  width: 100%;
  height: 100vh;
}

.controls {
  position: absolute;
  top: 20px;
  left: 20px;
  background: rgba(0, 0, 0, 0.8);
  color: white;
  padding: 20px;
  border-radius: 8px;
  min-width: 250px;
}

.controlsTitle {
  margin: 0 0 15px 0;
  font-size: 16px;
  font-weight: bold;
}

.controlGroup {
  margin-bottom: 15px;
  display: flex;
  flex-direction: column;
}

.controlLabel {
  font-size: 14px;
  margin-bottom: 5px;
}

.sliderContainer {
  display: flex;
  align-items: center;
  gap: 10px;
}

.rangeSlider {
  flex: 1;
  margin: 0 10px;
}

.valueDisplay {
  min-width: 50px;
  text-align: right;
  font-weight: bold;
  font-size: 14px;
}
</style>
  
 