<template>
  <div>
    <v-row
      align="center"
      justify="center"
    >
      <v-col class="text-center">
        <div class="text-subtitle-2">Offset Top</div>
        {{ offsetTop }}
      </v-col>
    </v-row>
    <v-container
      id="scroll-target"
      class="overflow-y-auto"
      style="max-height: 400px"
    >
      <v-row
        align="center"
        justify="center"
        style="height: 1000px"
        v-scroll:#scroll-target="onScroll"
      >
      </v-row>
    </v-container>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const offsetTop = ref(0)
  function onScroll (e) {
    offsetTop.value = e.target.scrollTop
  }
</script>

<script>
  export default {
    data: () => ({
      offsetTop: 0,
    }),

    methods: {
      onScroll (e) {
        this.offsetTop = e.target.scrollTop
      },
    },
  }
</script>
