<template>
  <v-card flat>
    <v-card-text>
      <v-container
        fluid
        class="pa-0"
      >
        <v-row>
          <v-col cols="12">
            <p>Normal</p>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              color="pink"
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              color="indigo"
            >
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              color="green"
            >
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              color="deep-orange"
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </v-col>
        </v-row>

        <v-row class="mt-12">
          <v-col cols="12">
            <p>Disabled</p>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              disabled
            >
              <v-icon>mdi-heart</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              disabled
            >
              <v-icon>mdi-star</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              disabled
            >
              <v-icon>mdi-cached</v-icon>
            </v-btn>
          </v-col>

          <v-col
            cols="12"
            sm="3"
          >
            <v-btn
              icon
              disabled
            >
              <v-icon>mdi-thumb-up</v-icon>
            </v-btn>
          </v-col>
        </v-row>
      </v-container>
    </v-card-text>
  </v-card>
</template>
