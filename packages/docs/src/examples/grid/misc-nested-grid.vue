<template>
  <v-container class="pa-0">
    <v-row class="bg-green pa-3">
      <v-col cols="8">
        <v-sheet class="pa-2 ma-2">
          Level 1: v-col-8
        </v-sheet>

        <v-row class="bg-red" gap="0">
          <v-col
            cols="8"
          >
            <v-sheet class="pa-2 ma-2">
              Level 2: v-col-8
            </v-sheet>
          </v-col>

          <v-col
            cols="4"
          >
            <v-sheet class="pa-2 ma-2">
              Level 2: v-col-4
            </v-sheet>
          </v-col>
        </v-row>
      </v-col>

      <v-col cols="4">
        <v-sheet class="pa-2 ma-2">
          Level 1: v-col-4
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
