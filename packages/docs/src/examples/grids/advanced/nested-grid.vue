<template>
  <v-container class="grey lighten-5">
    <v-row>
      <v-col sm="9">
        <v-card
          class="pa-2"
          outlined
          tile
        >
          Level 1: .col-sm-9
        </v-card>
        <v-row no-gutters>
          <v-col
            cols="8"
            sm="6"
          >
            <v-card
              class="pa-2"
              outlined
              style="background-color: lightgrey;"
              tile
            >
              Level 2: .col-8 .col-sm-6
            </v-card>
          </v-col>
          <v-col
            cols="4"
            sm="6"
          >
            <v-card
              class="pa-2"
              outlined
              style="background-color: lightgrey;"
              tile
            >
              Level 3: .col-4 .col-sm-6
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
  </v-container>
</template>
