<template>
  <div class="d-flex justify-center align-center">
    <v-checkbox
      v-model="checkbox"
      :label="`Checkbox: ${checkbox.toString()}`"
    ></v-checkbox>
  </div>
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
