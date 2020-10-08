<template>
  <v-row>
    <v-col
      v-for="value in ['-sm', '', '-lg', '-xl']"
      :key="value"
      cols="12"
      md="3"
    >
      <div
        :class="`rounded${value}`"
        class="pa-4 text-center secondary text-no-wrap"
        v-text="`.rounded${value}`"
      ></div>
    </v-col>
  </v-row>
</template>
