<template>
  <v-container>
    <v-row
      no-gutters
      class="flex-nowrap bg-surface-variant"
    >
      <v-col
        cols="2"
        class="flex-grow-0 flex-shrink-0"
      >
        <v-sheet class="ma-2 pa-2">
          I'm 2 column wide
        </v-sheet>
      </v-col>

      <v-col
        cols="1"
        style="min-width: 100px; max-width: 100%;"
        class="flex-grow-1 flex-shrink-0"
      >
        <v-sheet class="ma-2 pa-2">
          I'm 1 column wide and I grow to take all the space
        </v-sheet>
      </v-col>

      <v-col
        cols="5"
        style="min-width: 100px;"
        class="flex-grow-0 flex-shrink-1"
      >
        <v-sheet class="ma-2 pa-2">
          I'm 5 column wide and I shrink if there's not enough space
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
