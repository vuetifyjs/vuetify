<template>
  <v-layout wrap justify-space-around align-center>
    <v-avatar class="indigo">
      <v-icon dark>account_circle</v-icon>
    </v-avatar>
    <v-avatar>
      <img src="/doc-images/john.jpg" alt="John">
    </v-avatar>
    <v-avatar
      class="purple red--after"
      v-badge="{ overlap: true, value: '3' }"
    >
      <v-icon dark>notifications</v-icon>
    </v-avatar>
    <v-avatar class="teal">
      <span class="white--text headline">C</span>
    </v-avatar>
    <v-avatar class="red">
      <span class="white--text headline">J</span>
    </v-avatar>
  </v-layout>
</template>
