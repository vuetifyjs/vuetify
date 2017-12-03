<template>
  <v-container fluid>
    <v-layout row wrap>
      <v-flex xs12 md6>
        <v-subheader>Light</v-subheader>
        <v-card class="elevation-0">
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap class="dark--text">
                <v-flex xs4>on</v-flex>
                <v-flex xs4>off</v-flex>
                <v-flex xs4>indeterminate</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-checkbox input-value="true" value="true" dark></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value="" dark></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value="" indeterminate dark></v-checkbox>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="dark--text">
                <v-flex xs6>on disabled</v-flex>
                <v-flex xs6>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-checkbox input-value="true" value="true" dark disabled></v-checkbox>
                </v-flex>
                <v-flex xs6>
                  <v-checkbox value="" dark disabled></v-checkbox>
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
                <v-flex xs4>on</v-flex>
                <v-flex xs4>off</v-flex>
                <v-flex xs4>indeterminate</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-checkbox input-value="true" value="true" light></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value="" light></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value="" indeterminate light></v-checkbox>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="light--text">
                <v-flex xs6>on disabled</v-flex>
                <v-flex xs6>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-checkbox input-value="true" value="true" light disabled></v-checkbox>
                </v-flex>
                <v-flex xs6>
                  <v-checkbox value="" light disabled></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
