<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-progress
          :model-value="65"
          color="primary"
          label="Downloading..."
        ></v-progress>
      </v-col>

      <v-col cols="12" md="6">
        <v-progress
          :model-value="40"
          color="warning"
          label="Operation in progress..."
          label-position="bottom"
          hide-value
          indeterminate
        ></v-progress>
      </v-col>
    </v-row>
  </v-container>
</template>
