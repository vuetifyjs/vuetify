<template>
  <v-container fluid>
    <v-layout row wrap class="dark--text">
      <v-flex xs6>on</v-flex>
      <v-flex xs6>off</v-flex>
    </v-layout>
    <v-layout row wrap>
      <v-flex xs6>
        <v-switch value input-value="true"></v-switch>
      </v-flex>
      <v-flex xs6>
        <v-switch></v-switch>
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
</template>
