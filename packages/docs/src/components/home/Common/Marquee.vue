<template>
  <div :ref="containerEl" class="marquee" @focusout="onFocusOut">
    <div :ref="contentEl" class="marquee-content">
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
  const props = defineProps({
    items: {
      type: Array as PropType<any[]>,
      required: true,
    },
  })

  const shadowSize = 60 // px
  const containerEl = shallowRef<HTMLElement>()
  const contentEl = shallowRef<HTMLElement>()
  const shift = shallowRef(-50) // percentage
  const shiftTime = shallowRef(30) // seconds
  const shiftSpeed = 35 // px per second

  let observer: ResizeObserver | undefined

  onMounted(() => {
    observer = new ResizeObserver(onResize)
    if (containerEl.value) observer.observe(containerEl.value)
    if (contentEl.value) observer.observe(contentEl.value)
  })

  onBeforeUnmount(() => {
    observer?.disconnect()
  })

  function onResize () {
    const containerWidth = (containerEl.value?.offsetWidth ?? 0) - 2 * shadowSize
    const contentWidth = contentEl.value?.offsetWidth ?? 0

    const shiftPercentage = containerWidth / contentWidth - 1
    shift.value = Math.min(0, Math.round(shiftPercentage * 100))

    const shiftExact = contentWidth - containerWidth
    shiftTime.value = Math.max(0, Math.round(shiftExact / shiftSpeed))
  }

  function onFocusOut (e: FocusEvent) {
    (e.currentTarget as HTMLElement).scrollLeft = 0
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

.marquee:has(.marquee-content:focus-within) {
  .marquee-content {
    animation: none;
  }

  &::before,
  &::after {
    display: none;
  }
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
