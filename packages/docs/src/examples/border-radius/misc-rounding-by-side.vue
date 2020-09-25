<template>
  <v-row>
    <v-col
      v-for="value in ['t', 'r', 'b', 'l']"
      :key="value"
      cols="12"
      md="3"
    >
      <div
        :class="`rounded-${value}-xl`"
        class="pa-4 text-center secondary text-no-wrap"
        v-text="`.rounded-${value}-xl`"
      ></div>
    </v-col>
  </v-row>
</template>
