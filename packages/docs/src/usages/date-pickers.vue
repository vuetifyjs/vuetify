<template>
  <v-date-picker v-model="picker" v-bind="attrs" />
</template>

<script>
  import Usage from './usage'

  export default {
    mixins: [Usage],
    data () {
      return {
        picker: new Date().toISOString().substr(0, 10),
      }
    },
  }
</script>
