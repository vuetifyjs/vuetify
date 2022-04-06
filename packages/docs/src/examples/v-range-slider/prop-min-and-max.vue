<template>
  <v-range-slider
    v-model="range"
    :max="10"
    :min="-10"
    :step="1"
    hide-details
    class="align-center"
  >
    <template v-slot:prepend>
      <v-text-field
        :model-value="range[0]"
        hide-details
        single-line
        type="number"
        variant="outlined"
        density="compact"
        style="width: 70px"
        @change="$set(range, 0, $event)"
      ></v-text-field>
    </template>
    <template v-slot:append>
      <v-text-field
        :model-value="range[1]"
        hide-details
        single-line
        type="number"
        variant="outlined"
        style="width: 70px"
        density="compact"
        @change="$set(range, 1, $event)"
      ></v-text-field>
    </template>
  </v-range-slider>
</template>

<script>
  export default {
    data () {
      return {
        range: [-5, 5],
      }
    },
  }
</script>
