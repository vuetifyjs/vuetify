<template>
  <v-card
    :dark="dark"
    class="elevation-0"
    style="width: 360px; height: 650px; margin: auto;"
  >
    <v-system-bar status color="secondary">
      <v-spacer/>
      <v-icon>network_wifi</v-icon>
      <v-icon>signal_cellular_null</v-icon>
      <v-icon>battery_full</v-icon>
      <span>12:30</span>
    </v-system-bar>
    <v-toolbar color="primary elevation-0">
      <v-toolbar-side-icon/>
      <v-toolbar-title>Text</v-toolbar-title>
      <v-spacer/>
      <v-btn icon>
        <v-icon>search</v-icon>
      </v-btn>
    </v-toolbar>
    <v-card class="elevation-0">
      <v-card-media height="240px" class="grey lighten-2"/>
      <v-card-text style="position: relative; height: 325px">
        <v-btn
          absolute
          dark
          fab
          top
          right
          color="accent"
          class="elevation-0"
        >
          <v-icon>add</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </v-card>
</template>

<script type="text/javascript">
  export default {
    props: {
      dark: {
        type: Boolean,
        default: false
      }
    }
  }
</script>
