<template>
  <v-container fluid>
    <v-checkbox
      v-model="checkbox1"
      :label="`Checkbox 1: ${checkbox1.toString()}`"
    ></v-checkbox>
    <v-checkbox
      v-model="checkbox2"
      :label="`Checkbox 2: ${checkbox2.toString()}`"
    ></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        checkbox1: true,
        checkbox2: false,
      }
    },
  }
</script>
