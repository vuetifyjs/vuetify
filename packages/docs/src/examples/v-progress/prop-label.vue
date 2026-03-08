<template>
  <v-row>
    <v-col cols="12" md="6">
      <v-progress
        :model-value="65"
        color="primary"
        label="Uploading..."
      ></v-progress>
    </v-col>

    <v-col cols="12" md="6">
      <v-progress
        :model-value="40"
        color="secondary"
        label="Processing..."
        label-position="bottom"
      ></v-progress>
    </v-col>
  </v-row>
</template>
