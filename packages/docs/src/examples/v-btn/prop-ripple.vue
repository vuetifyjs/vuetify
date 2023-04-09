<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="auto">
        <v-btn
          height="72"
          min-width="164"
        >
          With Ripple
        </v-btn>
      </v-col>

      <v-col cols="auto">
        <v-btn
          :ripple="false"
          height="72"
          min-width="164"
        >
          Without Ripple
        </v-btn>
      </v-col>
    </v-row>
  </v-container>
</template>
