<template>
  <v-container>
    <v-row class="justify-center">
      <v-date-picker
        :weekday-format="$vuetify.display.width > 550 ? 'long' : 'short'"
        width="700"
      ></v-date-picker>
    </v-row>
  </v-container>
</template>
