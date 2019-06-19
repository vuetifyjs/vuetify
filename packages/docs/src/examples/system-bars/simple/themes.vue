<template>
  <div>
    <v-subheader>Light status bar</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
      <v-system-bar color="primary">
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Dark status bar</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout1.svg" height="200px">
      <v-system-bar color="primary" dark>
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
  </div>
</template>
