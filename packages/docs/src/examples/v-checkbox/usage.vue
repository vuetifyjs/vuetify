<template>
  <v-container
    class="px-0"
    fluid
  >
    <v-checkbox
      v-model="checkbox"
      :label="`Checkbox 1: ${checkbox.toString()}`"
    ></v-checkbox>
  </v-container>
</template>

<script>
  export default {
    data () {
      return {
        checkbox: true,
      }
    },
  }
</script>
