<template>
  <div :ref="containerResizeRef" class="marquee">
    <div :ref="contentResizeRef" class="marquee-content">
      <div
        v-for="(item, index) in props.items"
        :key="index"
        class="marquee-item"
      >
        <slot :item="item" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
  // @ts-expect-error
  import { useResizeObserver } from 'vuetify/lib/composables/resizeObserver'

  const props = defineProps({
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
  })

  const shadowSize = 60 // px
  const { resizeRef: containerResizeRef } = useResizeObserver(onResize)
  const { resizeRef: contentResizeRef } = useResizeObserver(onResize)
  const shift = shallowRef(-50) // percentage
  const shiftTime = shallowRef(30) // seconds
  const shiftSpeed = 35 // px per second

  function onResize () {
    const containerWidth = containerResizeRef.value.offsetWidth - 2 * shadowSize
    const contentWidth = contentResizeRef.value.offsetWidth

    const shiftPercentage = containerWidth / contentWidth - 1
    shift.value = Math.min(0, Math.round(shiftPercentage * 100))

    const shiftExact = contentWidth - containerWidth
    shiftTime.value = Math.max(0, Math.round(shiftExact / shiftSpeed))
  }
</script>

<style scoped>
.marquee {
  overflow: hidden;
  white-space: nowrap;
  padding: 4px calc(v-bind(shadowSize) * 1px);
  position: relative;
  width: 100%;
}

.marquee::before,
.marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: calc(v-bind(shadowSize) * 1px);
  z-index: 2;
  pointer-events: none;
}

.marquee::before {
  left: 0;
  background: linear-gradient(to right, rgb(var(--v-theme-background)), transparent);
}

.marquee::after {
  right: 0;
  background: linear-gradient(to left, rgb(var(--v-theme-background)), transparent);
}

.marquee-content {
  display: inline-flex;
  align-items: center;
  animation: scroll calc(v-bind(shiftTime) * 1s) linear infinite alternate;
  gap: 2rem;
}

.marquee-item {
  flex-shrink: 0;
  display: inline-flex;
  align-items: center;
  justify-content: center;
}

@keyframes scroll {
  0% {
    transform: translateX(calc(1% * v-bind(shift)));
  }
  100% {
    transform: translateX(0);
  }
}
</style>
