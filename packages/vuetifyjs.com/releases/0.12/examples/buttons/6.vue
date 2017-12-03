<template>
  <v-card class="elevation-0 py-5">
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-layout row wrap>
          <v-flex xs12>
            <p>Normal</p>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon class="pink--text">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon class="indigo--text">
              <v-icon>star</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon class="green--text">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon class="deep-orange--text">
              <v-icon>thumb_up</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
        <v-layout row wrap class="mt-5">
          <v-flex xs12>
            <p>Disabled</p>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon disabled class="pink--text">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon disabled class="indigo--text">
              <v-icon>star</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon disabled class="green--text">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-flex>
          <v-flex xs12 sm3>
            <v-btn icon disabled class="deep-orange--text">
              <v-icon>thumb_up</v-icon>
            </v-btn>
          </v-flex>
        </v-layout>
      </v-container>
    </v-card-text>
  </v-card>
</template>
