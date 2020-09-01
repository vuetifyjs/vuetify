
<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="value in ['tl', 'tr', 'br', 'bl']"
        :key="value"
        cols="12"
        md="2"
      >
        <div
          :class="`rounded-${value}-xl`"
          class="pa-6 text-center grey lighten-2"
          v-text="`.rounded-${value}-xl`"
        ></div>
      </v-col>
    </v-row>
  </v-container>
</template>
