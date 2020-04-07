<template>
  <v-file-input
    label="File input"
    v-bind="attrs"
  />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
