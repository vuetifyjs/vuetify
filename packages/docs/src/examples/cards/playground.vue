<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch label="Flat" v-model="flat"></v-switch>
      <v-switch label="Outlined" v-model="outlined"></v-switch>
      <v-switch label="Raised" v-model="raised"></v-switch>
      <v-switch label="Loading" v-model="loading"></v-switch>
      <v-switch label="With media" v-model="media"></v-switch>
      <v-switch label="With actions" v-model="actions"></v-switch>
      <v-slider label="Elevation" v-model="elevation" min="0" max="24"></v-slider>
      <v-slider label="Width" v-model="width" min="210" max="1000"></v-slider>
      <v-slider label="Height" v-model="height" min="320" max="1000"></v-slider>
    </v-layout>

    <v-card
      class="mx-auto"
      :flat="flat"
      :loading="loading"
      :outlined="outlined"
      :elevation="elevation"
      :raised="raised"
      :width="width"
      :height="height"
    >
      <v-img
        v-if="media"
        class="white--text"
        height="200px"
        src="https://cdn.vuetifyjs.com/images/cards/docks.jpg"
      >
        <v-card-title class="align-end fill-height">I'm a title</v-card-title>
      </v-img>
      <v-card-title v-else>I'm a title</v-card-title>

      <v-card-text>I'm card text</v-card-text>
      <v-card-actions v-if="actions">
        <v-btn icon>
          <v-icon>mdi-heart</v-icon>
        </v-btn>
        <v-btn text>Click</v-btn>
        <v-btn outline>Click</v-btn>
      </v-card-actions>
    </v-card>
  </div>
</template>

<script>
  export default {
    data: () => ({
      flat: false,
      media: true,
      loading: false,
      actions: true,
      outlined: false,
      elevation: undefined,
      raised: false,
      width: 344,
      height: undefined
    })
  }
</script>

<style scoped>
  .v-input__slider {
    width: 100%;
  }
</style>
