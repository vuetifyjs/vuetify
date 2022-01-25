
<template>
  <v-row justify="center">
    <v-col cols="12">
      <div
        class="pa-4 text-center secondary rounded-0"
        v-text="`.rounded-0`"
      ></div>
    </v-col>
    <v-col
      v-for="value in ['t', 'r', 'b', 'l', 'tl', 'tr', 'br', 'bl']"
      :key="value"
      cols="12"
      md="3"
    >
      <div
        :class="`pa-4 text-center secondary rounded-lg rounded-${value}-0`"
        v-text="`rounded-${value}-0`"
      ></div>
    </v-col>
  </v-row>
</template>
