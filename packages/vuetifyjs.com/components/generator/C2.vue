<template>
  <div
    style="width: 360px; height: 650px; margin: auto;"
    class="grey lighten-3"
  >
    <v-toolbar color="primary py-2 pl-4 elevation-0">
      <v-toolbar-title class="headline white--text">Text</v-toolbar-title>
    </v-toolbar>
    <v-card class="elevation-0">
      <v-card-media height="200px" class="grey lighten-2"/>
      <v-tabs grow :scrollable="false" color="primary">
        <v-tab
          v-for="tab in 3"
          :key="tab"
          :href="'#' + tab"
          ripple
        >
          <span class="subheading white--text">Item {{ tab }}</span>
        </v-tab>
        <v-tabs-slider color="accent" style="height: 4px"/>
      </v-tabs>
      <v-card-text class="grey lighten-4" style="position: relative; height: 330px">
        <v-btn
          flat
          absolute
          dark
          fab
          bottom
          right
          class="accent offset-fab"
        >
          <v-icon large>add</v-icon>
        </v-btn>
      </v-card-text>
    </v-card>
  </div>
</template>

<style lang="stylus">
  .offset-fab
    bottom: 50px !important
</style>
