<template>
  <v-container>
    <v-row
      class="flex-nowrap bg-surface-variant"
      density="compact"
    >
      <v-col
        class="flex-grow-0 flex-shrink-0"
        cols="2"
      >
        <v-sheet class="ma-2 pa-2">
          I'm 2 column wide
        </v-sheet>
      </v-col>

      <v-col
        class="flex-grow-1 flex-shrink-0"
        cols="1"
        style="min-width: 100px; max-width: 100%;"
      >
        <v-sheet class="ma-2 pa-2">
          I'm 1 column wide and I grow to take all the space
        </v-sheet>
      </v-col>

      <v-col
        class="flex-grow-0 flex-shrink-1"
        cols="5"
        style="min-width: 100px;"
      >
        <v-sheet class="ma-2 pa-2">
          I'm 5 column wide and I shrink if there's not enough space
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
