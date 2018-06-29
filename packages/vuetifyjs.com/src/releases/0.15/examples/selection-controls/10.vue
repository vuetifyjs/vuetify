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
                  <v-switch value input-value="true" ></v-switch>
                </v-flex>
                <v-flex xs6>
                  <v-switch ></v-switch>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="dark--text">
                <v-flex xs6>on disabled</v-flex>
                <v-flex xs6>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-switch value input-value="true" disabled></v-switch>
                </v-flex>
                <v-flex xs6>
                  <v-switch disabled></v-switch>
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
                <v-flex xs6>on</v-flex>
                <v-flex xs6>off</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-switch value input-value="true" dark></v-switch>
                </v-flex>
                <v-flex xs6>
                  <v-switch dark></v-switch>
                </v-flex>
              </v-layout>
              <v-layout row wrap class="light--text">
                <v-flex xs6>on disabled</v-flex>
                <v-flex xs6>off disabled</v-flex>
              </v-layout>
              <v-layout row wrap>
                <v-flex xs6>
                  <v-switch value input-value="true" dark disabled></v-switch>
                </v-flex>
                <v-flex xs6>
                  <v-switch dark disabled></v-switch>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>
