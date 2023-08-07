<template>
  <div>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
      color="purple"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
      color="red-lighten-2"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
      color="black"
    ></v-progress-linear>
  </div>
</template>

<script setup>
  import { onBeforeUnmount, onMounted, ref, watch } from 'vue'

  const value = ref(10)
  const bufferValue = ref(20)
  const interval = ref(0)

  watch(value, val => {
    if (val < 100) return
    value.value = 0
    bufferValue.value = 10
    startBuffer()
  })

  onMounted(() => {
    startBuffer()
  })
  onBeforeUnmount(() => {
    clearInterval(interval.value)
  })

  function startBuffer () {
    clearInterval(interval.value)
    interval.value = setInterval(() => {
      value.value += Math.random() * (15 - 5) + 5
      bufferValue.value += Math.random() * (15 - 5) + 6
    }, 2000)
  }
</script>

<script>
  export default {
    data () {
      return {
        value: 10,
        bufferValue: 20,
        interval: 0,
      }
    },

    watch: {
      value (val) {
        if (val < 100) return

        this.value = 0
        this.bufferValue = 10
        this.startBuffer()
      },
    },

    mounted () {
      this.startBuffer()
    },

    beforeUnmount () {
      clearInterval(this.interval)
    },

    methods: {
      startBuffer () {
        clearInterval(this.interval)

        this.interval = setInterval(() => {
          this.value += Math.random() * (15 - 5) + 5
          this.bufferValue += Math.random() * (15 - 5) + 6
        }, 2000)
      },
    },
  }
</script>
