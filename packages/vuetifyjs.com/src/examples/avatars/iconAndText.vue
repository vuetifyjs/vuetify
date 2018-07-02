<template>
  <v-layout
    align-center
    justify-space-around
    wrap
  >
    <v-avatar color="indigo">
      <v-icon dark>account_circle</v-icon>
    </v-avatar>

    <v-avatar>
      <img
        src="https://s3.amazonaws.com/vuetify-docs/images/john.jpg"
        alt="John"
      >
    </v-avatar>

    <v-badge overlap>
      <span slot="badge">3</span>

      <v-avatar
        color="purple red--after"
      >
        <v-icon dark>notifications</v-icon>
      </v-avatar>
    </v-badge>

    <v-avatar color="teal">
      <span class="white--text headline">C</span>
    </v-avatar>

    <v-avatar color="red">
      <span class="white--text headline">J</span>
    </v-avatar>
  </v-layout>
</template>
