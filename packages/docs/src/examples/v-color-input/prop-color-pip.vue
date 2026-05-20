<template>
  <v-container>
    <v-row>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
          label="Colored Pip"
          model-value="#7C0799"
          color-pip
          hide-actions
        ></v-color-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
          label="Colored Pip (tonal)"
          model-value="#1493DB"
          pip-variant="tonal"
          color-pip
          hide-actions
        ></v-color-input>
      </v-col>
      <v-col cols="12" sm="6">
        <v-color-input
          hide-details="auto"
          label="Colored Pip (flat)"
          model-value="#74DB14"
          pip-variant="flat"
          color-pip
          hide-actions
        ></v-color-input>
      </v-col>
    </v-row>
  </v-container>
</template>
