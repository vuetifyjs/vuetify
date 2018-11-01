<template>
  <v-container fluid grid-list-lg>
    <v-layout row wrap>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-toolbar>
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
              color="pink"
            >
              <v-icon>add</v-icon>
            </v-btn>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 sm12 md6>
        <v-card>
          <v-toolbar extended>
            <v-toolbar-side-icon></v-toolbar-side-icon>
            <v-btn
              color="pink"
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
          <v-card-text style="height: 236px;" class="grey lighten-5"></v-card-text>
          <v-card-text style="height: 100px; position: relative"></v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
