<template>
  <div class="d-flex justify-space-around">
    <v-color-picker
      v-model="picker"
      elevation="0"
    ></v-color-picker>

    <v-color-picker
      v-model="picker"
      elevation="15"
    ></v-color-picker>
  </div>
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
