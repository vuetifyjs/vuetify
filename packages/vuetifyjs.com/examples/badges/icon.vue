<template>
  <div class="text-xs-center">
    <v-badge overlay left color="purple" overlap>
      <v-icon slot="badge" dark>done</v-icon>
      <v-icon
        large
        color="grey lighten-1"
      >
        account_circle
      </v-icon>
    </v-badge>

    <v-badge overlap color="orange">
      <v-icon slot="badge" dark>notifications</v-icon>
      <v-icon
        large
        color="grey darken-1"
      >
        account_box
      </v-icon>
    </v-badge>
  </div>
</template>
