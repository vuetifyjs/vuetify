<template>
  <v-date-picker
    v-model="picker"
    show-adjacent-months
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
