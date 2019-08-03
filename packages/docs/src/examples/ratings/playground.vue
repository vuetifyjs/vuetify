<template>
  <div class="text-center">
    <v-text-field
      v-model="fullIcon"
      color="red darken-4"
      label="Full icon"
    ></v-text-field>
    <v-text-field
      v-model="halfIcon"
      :disabled="!halfIncrements"
      color="red darken-4"
      label="Half icon"
    ></v-text-field>
    <v-text-field
      v-model="emptyIcon"
      color="red darken-4"
      label="Empty icon"
    ></v-text-field>
    <v-layout wrap>
      <v-switch
        v-model="halfIncrements"
        class="ma-2"
        color="red darken-4"
        label="Half increments"
      ></v-switch>
      <v-switch
        v-model="hover"
        class="ma-2"
        color="red darken-4"
        label="Hover"
      ></v-switch>
      <v-switch
        v-model="readonly"
        class="ma-2"
        color="red darken-4"
        label="Readonly"
      ></v-switch>
      <v-switch
        v-model="dense"
        class="ma-2"
        color="red darken-4"
        label="Dense"
      ></v-switch>
    </v-layout>
    <v-slider
      v-model="length"
      color="red darken-4"
      min="1"
      max="15"
      label="Custom length"
    ></v-slider>
    <v-slider
      v-model="rating"
      color="blue darken-4"
      min="0"
      :max="length"
      :step="halfIncrements ? 0.5 : 1"
      label="Value"
    ></v-slider>
    <v-slider
      v-model="size"
      color="green darken-4"
      min="0"
      max="100"
      label="Size"
    ></v-slider>
    <v-autocomplete
      v-model="color"
      :items="colors"
      label="Color"
    ></v-autocomplete>
    <v-autocomplete
      v-model="bgColor"
      :items="bgColors"
      label="Background color"
    ></v-autocomplete>
    <v-rating
      v-model="rating"
      :length="length"
      :empty-icon="emptyIcon"
      :full-icon="fullIcon"
      :half-icon="halfIcon"
      :half-increments="halfIncrements"
      :hover="hover"
      :readonly="readonly"
      :size="size"
      :dense="dense"
      :color="color"
      :background-color="bgColor"
    ></v-rating>
    <div>
      <span class="caption text-uppercase">model:</span>
      <span class="font-weight-bold">
        {{ rating }}
      </span>
    </div>
  </div>
</template>

<script>
  export default {
    data: () => ({
      emptyIcon: 'mdi-heart-outline',
      fullIcon: 'mdi-heart',
      halfIcon: 'mdi-heart-half-full',
      halfIncrements: false,
      hover: true,
      length: 5,
      rating: 2,
      readonly: false,
      size: 64,
      dense: false,
      color: 'red lighten-3',
      colors: [
        'primary',
        'warning',
        'green',
        'red',
        'blue',
        'error',
        'teal',
        'red lighten-3',
      ],
      bgColor: 'grey lighten-1',
      bgColors: [
        'grey lighten-2',
        'warning lighten-1',
        'green lighten-2',
        'red lighten-2',
        'grey',
        '#eee',
        'cyan lighten-2',
        'grey lighten-1',
      ],
    }),
  }
</script>
