<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6" order-lg="2">
        <v-card dark tile flat color="error">
          <v-card-text>#1</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="6">
        <v-card dark tile flat color="red darken-4">
          <v-card-text>#2</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4" order-md="2" order="1">
        <v-card dark tile flat color="red lighten-1">
          <v-card-text>#1</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" order-md="3" order="2">
        <v-card dark tile flat color="red lighten-2">
          <v-card-text>#2</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="4" order-md="1" order="3">
        <v-card dark tile flat color="red darken-1">
          <v-card-text>#3</v-card-text>
        </v-card>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="12" sm="6" md="3" order-md="4" order-sm="2">
        <v-card dark tile flat color="red darken-2">
          <v-card-text>#1</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" order-md="3" order-sm="1">
        <v-card dark tile flat color="deep-orange lighten-1">
          <v-card-text>#2</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" order-md="2" order-sm="4">
        <v-card dark tile flat color="deep-orange darken-3">
          <v-card-text>#3</v-card-text>
        </v-card>
      </v-col>
      <v-col cols="12" sm="6" md="3" order-md="1" order-sm="3">
        <v-card dark tile flat color="deep-orange">
          <v-card-text>#4</v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
