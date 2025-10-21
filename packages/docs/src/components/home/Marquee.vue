<template>
  <div class="marquee">
    <div class="marquee-content">
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

<script setup>
  const props = defineProps({
    items: {
      type: Array,
      required: true,
    },
  })
</script>

<style scoped>
.marquee {
  overflow: hidden;
  white-space: nowrap;
  position: relative;
  width: 100%;
}

.marquee::before,
.marquee::after {
  content: '';
  position: absolute;
  top: 0;
  bottom: 0;
  width: 60px;
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
  animation: scroll 30s linear infinite;
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
    transform: translateX(-50%);
  }
  100% {
    transform: translateX(0);
  }
}
</style>
