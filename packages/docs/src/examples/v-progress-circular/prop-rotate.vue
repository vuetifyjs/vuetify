<template>
  <div class="text-center">
    <v-progress-circular
      :model-value="value"
      :rotate="360"
      :size="100"
      :width="15"
      color="teal"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :model-value="value"
      :rotate="-90"
      :size="100"
      :width="15"
      color="primary"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :model-value="value"
      :rotate="90"
      :size="100"
      :width="15"
      color="red"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      :model-value="value"
      :rotate="180"
      :size="100"
      :width="15"
      color="pink"
    >
      {{ value }}
    </v-progress-circular>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref } from 'vue'

  const value = ref(0)

  let interval = -1
  onMounted(() => {
    interval = setInterval(() => {
      if (value.value === 100) {
        return (value.value = 0)
      }
      value.value += 10
    }, 1000)
  })
  onBeforeUnmount(() => {
    clearInterval(interval)
  })
</script>

<script>
  export default {
    data () {
      return {
        interval: {},
        value: 0,
      }
    },
    beforeUnmount () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    },
  }
</script>

<style scoped>
.v-progress-circular {
  margin: 1rem;
}
</style>
