<template>
  <div>
    <v-subheader>Light status bar</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
      <v-system-bar color="primary">
        <div class="flex-grow-1"></div>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <v-icon>mdi-signal-cellular-outline</v-icon>
        <v-icon>mdi-battery</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Dark status bar</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
      <v-system-bar color="primary" dark>
        <div class="flex-grow-1"></div>
        <v-icon>mdi-wifi-strength-4</v-icon>
        <v-icon>mdi-signal-cellular-outline</v-icon>
        <v-icon>mdi-battery</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
  </div>
</template>
