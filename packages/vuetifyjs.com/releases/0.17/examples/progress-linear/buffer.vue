<template>
  <v-progress-linear
    v-model="buffer"
    buffer
    v-bind:buffer-value="bufferValue"
  ></v-progress-linear>
</template>

<script>
  export default {
    data () {
      return {
        value: 0,
        buffer: 10,
        bufferValue: 20,
        interval: {}
      }
    },
    methods: {
      startBuffer () {
        this.interval = setInterval(() => {
          this.buffer += Math.random() * (15 - 5) + 5
          this.bufferValue += Math.random() * (15 - 5) + 5
        }, 2000)
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.startBuffer()
    }
  }
</script>
