<template>
  <v-card
    class="mx-auto"
    max-width="450"
  >
    <v-img
      :aspect-ratio="16/9"
      src="https://cdn.vuetifyjs.com/images/cards/house.jpg"
      cover
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
          class="me-4"
          size="24"
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
        @click="lights"
      >
        Turn on lights
      </v-chip>
      <v-chip
        prepend-icon="mdi-alarm-check"
        @click="alarm"
      >
        Set alarm
      </v-chip>
      <v-chip
        icon="mdi-blinds"
        @click="blinds"
      >
        Close blinds
      </v-chip>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    methods: {
      alarm () {
        alert('Turning on alarm...')
      },
      blinds () {
        alert('Toggling blinds...')
      },
      lights () {
        alert('Toggling lights...')
      },
    },
  }
</script>
