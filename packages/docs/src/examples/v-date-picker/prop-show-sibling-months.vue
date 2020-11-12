<template>
  <v-date-picker
    v-model="picker"
    show-sibling-months
  ></v-date-picker>
</template>

<script>
  export default {
    data () {
      return {
        picker: null,
      }
    },
  }
</script>
