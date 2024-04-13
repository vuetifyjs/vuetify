<template>
  <v-container fluid>
    <v-row>
      <v-col cols="6">
        <v-switch
          :model-value="true"
          color="primary"
          label="on"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          :model-value="false"
          color="primary"
          label="off"
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-switch
          :model-value="true"
          color="primary"
          label="on disabled"
          disabled
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          :model-value="false"
          color="primary"
          label="off disabled"
          disabled
        ></v-switch>
      </v-col>
    </v-row>

    <v-row>
      <v-col cols="6">
        <v-switch
          :model-value="true"
          label="on loading"
          loading="warning"
        ></v-switch>
      </v-col>
      <v-col cols="6">
        <v-switch
          :model-value="false"
          label="off loading"
          loading="warning"
        ></v-switch>
      </v-col>
    </v-row>
  </v-container>
</template>
