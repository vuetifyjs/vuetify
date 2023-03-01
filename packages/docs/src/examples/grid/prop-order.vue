<template>
  <v-container class="bg-surface-variant">
    <v-row no-gutters>
      <v-col order="6">
        <v-sheet class="pa-2 ma-2">
          First in markup, but middle in row
        </v-sheet>
      </v-col>
      <v-col order="12">
        <v-sheet class="pa-2 ma-2">
          Second in markup, but last in row
        </v-sheet>
      </v-col>
      <v-col order="1">
        <v-sheet class="pa-2 ma-2">
          Third in markup, but first in row
        </v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
