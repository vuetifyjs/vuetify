<template>
  <v-container class="text-center">
    <v-row>
      <v-col cols="12">
        <v-card dark color="primary">12</v-card>
      </v-col>
      <v-col v-for="i in 2" :key="`6${i}`" cols="6">
        <v-card dark color="secondary">6</v-card>
      </v-col>
      <v-col v-for="i in 3" :key="`4${i}`" cols="4">
        <v-card dark color="primary">4</v-card>
      </v-col>
      <v-col v-for="i in 4" :key="`3${i}`" cols="3">
        <v-card dark color="secondary">3</v-card>
      </v-col>
      <v-col v-for="i in 6" :key="`2${i}`" cols="2">
        <v-card dark color="primary">2</v-card>
      </v-col>
      <v-col v-for="i in 12" :key="`1${i}`" cols="1">
        <v-card dark color="secondary">1</v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
