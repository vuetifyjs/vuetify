<template>
  <v-sheet
    :max-height="296"
    class="mx-auto"
    elevation="8"
    max-width="600"
  >
    <v-slide-group
      ref="slideGroup"
      class="px-4 py-2"
      direction="vertical"
      next-icon="mdi-chevron-down"
      prev-icon="mdi-chevron-up"
      scroll-snap="start"
      show-arrows
      @wheel.prevent="onWheel"
    >
      <v-slide-group-item
        v-for="n in 15"
        :key="n"
      >
        <div class="py-2">
          <v-card
            :style="`background: oklch(0.7 0.15 ${(n - 1) * (360 / 15)})`"
            height="100"
          ></v-card>
        </div>
      </v-slide-group-item>
    </v-slide-group>
  </v-sheet>
</template>

<script setup>
  import { ref } from 'vue'

  const slideGroup = ref()
  let last = 0

  function onWheel (e) {
    const now = Date.now()
    if (now - last < 200) return
    last = now
    slideGroup.value.slide(e.deltaY > 0 ? 'next' : 'prev')
  }
</script>

<script>
  export default {
    data: () => ({
      last: 0,
    }),
    methods: {
      onWheel (e) {
        const now = Date.now()
        if (now - this.last < 200) return
        this.last = now
        this.$refs.slideGroup.slide(e.deltaY > 0 ? 'next' : 'prev')
      },
    },
  }
</script>
