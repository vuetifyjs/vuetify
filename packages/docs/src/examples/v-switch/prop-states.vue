<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-switch
          color="primary"
          :model-value="true"
          label="on"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          color="primary"
          :model-value="false"
          label="off"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-switch
          color="primary"
          :model-value="true"
          disabled
          label="on disabled"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          color="primary"
          :model-value="false"
          disabled
          label="off disabled"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-switch
          loading="warning"
          :model-value="true"
          label="on loading"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          :model-value="false"
          loading="warning"
          label="off loading"
        ></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>
