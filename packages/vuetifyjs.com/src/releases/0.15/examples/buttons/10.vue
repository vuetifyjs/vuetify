<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <div class="text-xs-center">
          <v-card class="elevation-0">
            <v-card-text>
              <div>
                <v-btn small primary dark>Small Button</v-btn>
              </div>
              <div>
                <v-btn warning dark>Normal Button</v-btn>
              </div>
              <div>
                <v-btn error dark large>Large Button</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <div class="text-xs-center">
          <v-card class="elevation-0">
            <v-card-text>
              <div>
                <v-btn primary fab small dark>
                  <v-icon>edit</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn warning fab dark>
                  <v-icon>account_circle</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn error fab large dark>
                  <v-icon>alarm</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
