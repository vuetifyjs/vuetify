<template>
  <div>
    <v-subheader>Light status bar</v-subheader>
    <v-card img="/static/vuetify_layout1.svg" height="200px">
      <v-system-bar status class="primary">
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Lights out</v-subheader>
    <v-card img="/static/vuetify_layout2.svg" height="200px">
      <v-system-bar status class="primary" lights-out>
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Dark status bar</v-subheader>
    <v-card img="/static/vuetify_layout1.svg" height="200px">
      <v-system-bar status class="primary" dark>
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-subheader>Lights out</v-subheader>
    <v-card img="/static/vuetify_layout2.svg" height="200px">
      <v-system-bar status class="primary" lights-out dark>
        <v-spacer></v-spacer>
        <v-icon>network_wifi</v-icon>
        <v-icon>signal_cellular_null</v-icon>
        <v-icon>battery_full</v-icon>
        <span>12:30</span>
      </v-system-bar>
    </v-card>
    <v-divider class="my-5"></v-divider>
    <v-subheader>Window bar</v-subheader>
    <v-system-bar window dark>
      <v-spacer></v-spacer>
      <v-icon>remove</v-icon>
      <v-icon>check_box_outline_blank</v-icon>
      <v-icon>close</v-icon>
    </v-system-bar>
  </div>
</template>