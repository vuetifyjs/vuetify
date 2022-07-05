<template>
  <v-container class="bg-surface-variant">
    <v-row justify="start">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2 ma-2">
          .justify-start
        </v-sheet>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2 ma-2">
          .justify-center
        </v-sheet>
      </v-col>
    </v-row>

    <v-row justify="end">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2 ma-2">
          .justify-end
        </v-sheet>
      </v-col>
    </v-row>

    <v-row justify="space-around">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2 ma-2">
          .justify-space-around
        </v-sheet>
      </v-col>
    </v-row>

    <v-row justify="space-between">
      <v-col
        v-for="k in 2"
        :key="k"
        cols="4"
      >
        <v-sheet class="pa-2 ma-2">
          .justify-space-between
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  export default {
    data: () => ({
      justify: [
        'start',
        'center',
        'end',
        'space-around',
        'space-between',
      ],
    }),
  }
</script>
