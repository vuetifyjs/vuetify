<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <div class="text-xs-center">
          <v-card class="elevation-0">
            <v-card-text>
              <div>
                <v-btn small primary light>Small Button</v-btn>
              </div>
              <div>
                <v-btn warning light>Normal Button</v-btn>
              </div>
              <div>
                <v-btn error light large>Large Button</v-btn>
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
                <v-btn primary floating small>
                  <v-icon light>edit</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn warning floating>
                  <v-icon light>account_circle</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn error floating large>
                  <v-icon light>alarm</v-icon>
                </v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
    </v-layout>
  </v-container>
</template>
