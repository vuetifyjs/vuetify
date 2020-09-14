<template>
  <v-container fluid>
    <v-row class="dark--text">
      <v-col cols="6">
        on
      </v-col>
      <v-col cols="6">
        off
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-switch
          color="primary"
          value
          input-value="true"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch color="primary"></v-switch>
      </v-col>
    </v-row>
    <v-row class="dark--text">
      <v-col cols="6">
        on disabled
      </v-col>
      <v-col cols="6">
        off disabled
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-switch
          color="primary"
          value
          input-value="true"
          disabled
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch disabled></v-switch>
      </v-col>
    </v-row>
    <v-row class="dark--text">
      <v-col cols="6">
        on loading
      </v-col>
      <v-col cols="6">
        off loading
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="6">
        <v-switch
          loading="warning"
          value
          input-value="true"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch loading="warning"></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>
