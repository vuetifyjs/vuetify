<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-toolbar class="white">
            <v-toolbar-side-icon></v-toolbar-side-icon>
          </v-toolbar>
          <v-card-text style="height: 300px;" class="grey lighten-5"></v-card-text>
          <v-card-text style="height: 100px; position: relative">
            <v-btn
              absolute
              dark
              fab
              top
              right
              class="pink"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-toolbar class="white" extended>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-btn
              class="pink"
              dark
              small
              absolute
              bottom
              left
              fab
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-toolbar>
          <v-card-text style="height: 228px;" class="grey lighten-5"></v-card-text>
          <v-card-text style="height: 100px; position: relative">
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
