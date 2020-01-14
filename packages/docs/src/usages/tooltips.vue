<template>
  <v-tooltip v-bind="attrs" />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
