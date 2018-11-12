<template>
  <div class="text-xs-center">
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
        color="red darken-4"
        label="Half increments"
      ></v-switch>
      <v-switch
        v-model="hover"
        color="red darken-4"
        label="Hover"
      ></v-switch>
      <v-switch
        v-model="readonly"
        color="red darken-4"
        label="Readonly"
      ></v-switch>
    </v-layout>
    <v-slider
      v-model="length"
      color="red darken-4"
      min="1"
      max="15"
      label="Custom length"
    ></v-slider>
    <v-rating
      v-model="rating"
      :length="length"
      :empty-icon="emptyIcon"
      :full-icon="fullIcon"
      :half-icon="halfIcon"
      :half-increments="halfIncrements"
      :hover="hover"
      :readonly="readonly"
      color="red lighten-3"
      background-color="grey lighten-1"
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
      readonly: false
    })
  }
</script>

<codepen-resources lang="json">
  {
    "css": ["https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css"]
  }
</codepen-resources>
