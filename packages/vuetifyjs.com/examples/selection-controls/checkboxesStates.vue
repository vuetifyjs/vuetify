<template>
  <v-container fluid>
    <v-layout row wrap class="light--text">
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
    <v-layout row wrap class="light--text">
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
</template>
