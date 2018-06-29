<template>
  <v-container fluid class="pa-0">
    <v-layout row wrap>
      <v-flex xs12 sm6>
        <div class="text-xs-center">
          <v-card flat>
            <v-card-text>
              <div>
                <v-btn small color="primary" dark>Small Button</v-btn>
              </div>
              <div>
                <v-btn color="warning" dark>Normal Button</v-btn>
              </div>
              <div>
                <v-btn color="error" dark large>Large Button</v-btn>
              </div>
            </v-card-text>
          </v-card>
        </div>
      </v-flex>
      <v-flex xs12 sm6>
        <div class="text-xs-center">
          <v-card flat>
            <v-card-text>
              <div>
                <v-btn color="primary" fab small dark>
                  <v-icon>edit</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn color="warning" fab dark>
                  <v-icon>account_circle</v-icon>
                </v-btn>
              </div>
              <div>
                <v-btn color="error" fab large dark>
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
