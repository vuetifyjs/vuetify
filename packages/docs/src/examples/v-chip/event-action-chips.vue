<template>
  <v-card
    class="mx-auto"
    max-width="450"
  >
    <v-img
      src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
      cover
      :aspect-ratio="16/9"
    >
    </v-img>
    <v-card-title class="flex-column align-start">
      <div class="text-h4 mb-2">
        Welcome Home...
      </div>
      <div class="text-h6 font-weight-regular text-grey">
        Monday, 12:30 PM, Mostly Sunny
      </div>
      <div class="d-flex align-center">
        <v-avatar
          size="24"
          class="me-4"
        >
          <v-img
            src="https://cdn.vuetifyjs.com/images/weather/part-cloud-48px.png"
            contain
          ></v-img>
        </v-avatar>

        <span class="text-body-2 text-grey">81° / 62°</span>
      </div>
    </v-card-title>

    <v-divider class="mx-4"></v-divider>

    <v-card-text class="d-flex justify-space-between">
      <v-chip
        prepend-icon="mdi-brightness-5"
      >
        Turn on lights
      </v-chip>
      <v-chip
        prepend-icon="mdi-alarm-check"
      >
        Set alarm
      </v-chip>
      <v-chip
        icon="mdi-blinds"
      >
        Close blinds
      </v-chip>
    </v-card-text>
  </v-card>
</template>
