<template>
  <v-range-slider
    v-model="value"
    :value-format="({ value }) => formatTime(value)"
    end-thumb-aria-label="Latest"
    label="Departure"
    max="1439"
    start-thumb-aria-label="Earliest"
    step="15"
    thumb-label="always"
  ></v-range-slider>
</template>

<script setup>
  import { ref } from 'vue'

  const value = ref([540, 1080])

  function formatTime (minutes) {
    return new Date(0, 0, 1, 0, minutes).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
  }
</script>

<script>
  export default {
    data () {
      return {
        value: [540, 1080],
      }
    },
    methods: {
      formatTime (minutes) {
        return new Date(0, 0, 1, 0, minutes).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })
      },
    },
  }
</script>
