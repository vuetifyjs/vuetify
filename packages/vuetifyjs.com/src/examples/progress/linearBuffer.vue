<template>
  <v-progress-linear
    v-model="buffer"
    :buffer-value="bufferValue"
    buffer
  ></v-progress-linear>
</template>

<script>
  export default {
    data () {
      return {
        value: 0,
        buffer: 10,
        bufferValue: 20,
        interval: 0
      }
    },

    mounted () {
      this.startBuffer()
    },

    beforeDestroy () {
      clearInterval(this.interval)
    },

    methods: {
      startBuffer () {
        this.interval = setInterval(() => {
          this.buffer += Math.random() * (15 - 5) + 5
          this.bufferValue += Math.random() * (15 - 5) + 5
        }, 2000)
      }
    }
  }
</script>
