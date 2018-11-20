<template>
  <div>
    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="360"
      v-bind:value="value"
      color="teal"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="-90"
      v-bind:value="value"
      color="primary"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="90"
      v-bind:value="value"
      color="red"
    >
      {{ value }}
    </v-progress-circular>

    <v-progress-circular
      v-bind:size="100"
      v-bind:width="15"
      v-bind:rotate="180"
      v-bind:value="value"
      color="pink"
    >
      {{ value }}
    </v-progress-circular>
  </div>
</template>

<script>
  export default {
    data () {
      return {
        interval: {},
        value: 0
      }
    },
    beforeDestroy () {
      clearInterval(this.interval)
    },
    mounted () {
      this.interval = setInterval(() => {
        if (this.value === 100) {
          return (this.value = 0)
        }
        this.value += 10
      }, 1000)
    }
  }
</script>

<style lang="stylus" scoped>
  div
    text-align: center

  .progress-circular
    margin: 1rem
</style>
