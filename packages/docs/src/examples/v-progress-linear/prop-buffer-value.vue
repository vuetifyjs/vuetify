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
      color="red lighten-2"
    ></v-progress-linear>
    <br>
    <v-progress-linear
      v-model="value"
      :buffer-value="bufferValue"
      color="black"
    ></v-progress-linear>
  </div>
</template>

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

    beforeDestroy () {
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
