<template>
  <v-card flat>
    <v-card-text>
      <v-container fluid class="pa-0">
        <v-row>
          <v-col cols="12">
            <p>Normal</p>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn text icon color="pink">
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn text icon color="indigo">
              <v-icon>star</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn text icon color="green">
              <v-icon>cached</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn text icon color="deep-orange">
              <v-icon>thumb_up</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-12">
          <v-col cols="12">
            <p>Disabled</p>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn icon disabled>
              <v-icon>favorite</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn icon disabled>
              <v-icon>star</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn icon disabled>
              <v-icon>cached</v-icon>
            </v-btn>
          </v-col>

          <v-col cols="12" sm="3">
            <v-btn icon disabled>
              <v-icon>thumb_up</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
