<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Light</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap class="dark--text">
                <v-flex xs6>on</v-flex>
                <v-flex xs6>off</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-radio value="radio-1" input-value="radio-1" dark></v-radio>
                </v-flex>
                <v-flex xs6>
                  <v-radio input-value="radio-2" dark></v-radio>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="dark--text">
                <v-flex xs6>on disabled</v-flex>
                <v-flex xs6>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-radio value="radio-3" input-value="radio-3"  dark disabled></v-radio>
                </v-flex>
                <v-flex xs6>
                  <v-radio input-value="radio-4" dark disabled></v-radio>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Dark</v-subheader>
        <v-card class="secondary elevation-0">
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap class="light--text">
                <v-flex xs6>on</v-flex>
                <v-flex xs6>off</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-radio value="radio-5" input-value="radio-5" light></v-radio>
                </v-flex>
                <v-flex xs6>
                  <v-radio input-value="radio-6" light></v-radio>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="light--text">
                <v-flex xs6>on disabled</v-flex>
                <v-flex xs6>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-radio value="radio-7" input-value="radio-7"  light disabled></v-radio>
                </v-flex>
                <v-flex xs6>
                  <v-radio input-value="radio-8" light disabled></v-radio>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
