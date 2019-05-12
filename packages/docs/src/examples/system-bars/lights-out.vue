<template>
  <div>
    <v-subheader>Lights out (light)</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg" height="200px">
      <v-system-bar status color="primary" lights-out>
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Lights out (dark)</v-subheader>
    <v-card img="https://cdn.vuetifyjs.com/images/home/vuetify_layout2.svg" height="200px">
      <v-system-bar status color="primary" lights-out dark>
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
  </div>
</template>
