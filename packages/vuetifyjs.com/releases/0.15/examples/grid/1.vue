<template>
  <v-container grid-list-md text-xs-center>
    <v-layout row wrap>
      <v-flex xs12>
        <v-card dark class="primary">
          <v-card-text class="px-0">12</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6 v-for="i in 2" :key="i">
        <v-card dark class="secondary">
          <v-card-text class="px-0">6</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 v-for="i in 3" :key="i">
        <v-card dark class="primary">
          <v-card-text class="px-0">4</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs3 v-for="i in 4" :key="i">
        <v-card dark class="secondary">
          <v-card-text class="px-0">3</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs2 v-for="i in 6" :key="i">
        <v-card dark class="primary">
          <v-card-text class="px-0">2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs1 v-for="i in 12" :key="i">
        <v-card dark class="secondary">
          <v-card-text class="px-0">1</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
