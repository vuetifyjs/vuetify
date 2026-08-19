<template>
  <v-sheet
    :style="{ backgroundPosition: `${x}px ${y}px` }"
    class="touch-grid d-flex align-center justify-center overflow-hidden"
    height="300"
    v-touch="{ start: onStart, move: onMove, end: onEnd }"
  >
    <div class="text-center">
      <div class="text-h6">{{ dragging ? 'Dragging…' : 'Touch and drag the grid' }}</div>
      <div class="text-body-2">offset x: {{ Math.round(x) }} · y: {{ Math.round(y) }}</div>
    </div>
  </v-sheet>
</template>

<script setup>
  import { onBeforeUnmount, ref } from 'vue'

  const dragging = ref(false)
  const x = ref(0)
  const y = ref(0)

  let originX = 0
  let originY = 0
  let lastX = 0
  let lastY = 0
  let vx = 0
  let vy = 0
  let frame = 0

  function onStart () {
    cancelAnimationFrame(frame)
    dragging.value = true
    lastX = lastY = vx = vy = 0
  }

  // offsetX/offsetY are only set on `end`, so derive the live delta from the raw touch data
  function onMove ({ touchstartX, touchstartY, touchmoveX, touchmoveY }) {
    const dx = touchmoveX - touchstartX
    const dy = touchmoveY - touchstartY
    vx = dx - lastX
    vy = dy - lastY
    lastX = dx
    lastY = dy
    x.value = originX + dx
    y.value = originY + dy
  }

  function onEnd () {
    dragging.value = false
    originX = x.value
    originY = y.value
    glide()
  }

  function glide () {
    vx *= 0.92
    vy *= 0.92
    originX = x.value += vx
    originY = y.value += vy
    if (Math.hypot(vx, vy) > 0.4) frame = requestAnimationFrame(glide)
  }

  onBeforeUnmount(() => cancelAnimationFrame(frame))
</script>

<style scoped>
  .touch-grid {
    background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='30' height='30'%3E%3Cpath d='M30 0H0V30' fill='none' stroke='%23999' stroke-width='1' stroke-dasharray='4 4'/%3E%3C/svg%3E");
    background-size: 30px 30px;
    touch-action: none;
    cursor: grab;
  }

  .touch-grid:active {
    cursor: grabbing;
  }
</style>
