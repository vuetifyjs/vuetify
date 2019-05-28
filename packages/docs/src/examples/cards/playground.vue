<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="flat" label="Flat"></v-switch>
      <v-switch v-model="outlined" label="Outlined"></v-switch>
      <v-switch v-model="raised" label="Raised"></v-switch>
      <v-switch v-model="loading" label="Loading"></v-switch>
      <v-switch v-model="media" label="With media"></v-switch>
      <v-switch v-model="actions" label="With actions"></v-switch>
      <v-slider v-model="elevation" label="Elevation" min="0" max="24"></v-slider>
      <v-slider v-model="width" label="Width" min="210" max="1000"></v-slider>
      <v-slider v-model="height" label="Height" min="320" max="1000"></v-slider>
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
        <v-btn outlined>Click</v-btn>
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
