<template>
  <v-container grid-list-xl text-xs-center>
    <v-layout row wrap>
      <v-flex xs10 offset-xs1>
        <v-card dark class="purple">
          <v-card-text>xs10 offset-xs1</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs7 offset-xs0 offset-md2 offset-lg5>
        <v-card dark class="secondary">
          <v-card-text>xs7 offset-xs5</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5 md2>
        <v-card dark class="primary">
          <v-card-text>xs5</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm5 md3 offset-xs0 offset-lg2>
        <v-card dark class="green">
          <v-card-text>xs5 offset-xs2</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
