<template>
  <v-slider
    v-model="slider"
    class="align-center"
    :max="max"
    :min="min"
    hide-details
  >
    <template v-slot:append>
      <v-text-field
        v-model="slider"
        hide-details
        single-line
        density="compact"
        type="number"
        style="width: 70px"
      ></v-text-field>
    </template>
  </v-slider>
</template>

<script>
  export default {
    data () {
      return {
        min: -50,
        max: 90,
        slider: 40,
      }
    },
  }
</script>
