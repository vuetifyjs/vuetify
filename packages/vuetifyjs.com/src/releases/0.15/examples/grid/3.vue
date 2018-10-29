<template>
  <v-container fluid>
    <v-layout row>
      <v-flex xs6 order-lg2>
        <v-card dark tile flat class="error">
          <v-card-text>#1</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs6>
        <v-card dark tile flat class="red darken-4">
          <v-card-text>#2</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row>
      <v-flex xs4 order-md2 order-xs1>
        <v-card dark tile flat class="red lighten-1">
            <v-card-text>#1</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 order-md3 order-xs2>
        <v-card dark tile flat class="red lighten-2">
            <v-card-text>#2</v-card-text>
        </v-card>
      </v-flex>
      <v-flex xs4 order-md1 order-xs3>
        <v-card dark tile flat class="red darken-1">
          <v-card-text>#3</v-card-text>
        </v-card>
      </v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs12 sm6 md3 order-md4 order-sm2>
        <v-card dark tile flat class="red darken-2">
          <v-card-text>#1</v-card-text>
        </v-card>
      </v-flex>
        <v-flex xs12 sm6 md3 order-md3 order-sm1>
          <v-card dark tile flat class="deep-orange lighten-1">
            <v-card-text>#2</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 order-md2 order-sm4>
          <v-card dark tile flat class="deep-orange darken-3">
            <v-card-text>#3</v-card-text>
          </v-card>
        </v-flex>
        <v-flex xs12 sm6 md3 order-md1 order-sm3>
          <v-card dark tile flat class="deep-orange">
            <v-card-text>#4</v-card-text>
          </v-card>
        </v-flex>
    </v-layout>
  </v-container>
</template>
