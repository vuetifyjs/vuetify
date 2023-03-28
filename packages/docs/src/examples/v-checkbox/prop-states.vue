<template>
  <v-container fluid>
    <v-row>
      <v-col cols="4">
        on
      </v-col>
      <v-col cols="4">
        off
      </v-col>
      <v-col cols="4">
        indeterminate
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-checkbox
          :model-value="true"
        ></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-checkbox :model-value="false"></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-checkbox
          indeterminate
        ></v-checkbox>
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        on disabled
      </v-col>
      <v-col cols="4">
        off disabled
      </v-col>
    </v-row>
    <v-row>
      <v-col cols="4">
        <v-checkbox
          :model-value="true"
          disabled
        ></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-checkbox
          :model-value="false"
          disabled
        ></v-checkbox>
      </v-col>
      <v-col cols="4">
        <v-checkbox
          disabled
          indeterminate
        ></v-checkbox>
      </v-col>
    </v-row>
  </v-container>
</template>
