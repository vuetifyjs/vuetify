<template>
  <v-bottom-navigation v-bind="attrs" />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
  }
</script>
