<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="value in ['-sm', '', '-lg', '-xl']"
        :key="value"
        cols="12"
        md="2"
      >
        <div
          :class="`rounded${value}`"
          class="pa-6 text-center grey lighten-2"
          v-text="`.rounded${value}`"
        ></div>
      </v-col>
    </v-row>
  </v-container>
</template>
