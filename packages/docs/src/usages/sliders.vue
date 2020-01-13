<template>
  <v-slider
    label="Slider"
    hint="hint"
    v-bind="attrs"
  />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
