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
                  <v-checkbox input-value="true" value></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value indeterminate></v-checkbox>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="dark--text">
                <v-flex xs4>on disabled</v-flex>
                <v-flex xs4>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-checkbox input-value="true" value disabled></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value disabled></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs12 md6>
        <v-subheader>Dark</v-subheader>
        <v-card dark class="secondary elevation-0">
          <v-card-text>
            <v-container fluid>
              <v-layout row wrap class="light--text">
                <v-flex xs4>on</v-flex>
                <v-flex xs4>off</v-flex>
                <v-flex xs4>indeterminate</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-checkbox input-value="true" value dark></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value dark></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value indeterminate dark></v-checkbox>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="light--text">
                <v-flex xs4>on disabled</v-flex>
                <v-flex xs4>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs4>
                  <v-checkbox input-value="true" value dark disabled></v-checkbox>
                </v-flex>
                <v-flex xs4>
                  <v-checkbox value dark disabled></v-checkbox>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
