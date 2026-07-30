<template>
  <v-container class="bg-surface-variant">
    <v-row class="mb-6">
      <v-col cols="2/5">
        <v-sheet class="pa-2 text-center" color="purple-accent-4">2/5</v-sheet>
      </v-col>
      <v-col cols="1/2">
        <v-sheet class="pa-2 text-center" color="brown-darken-1">1/2</v-sheet>
      </v-col>
      <v-col cols="1/10">
        <v-sheet class="pa-2 text-center" color="teal-darken-1">1/10</v-sheet>
      </v-col>
    </v-row>

    <v-row>
      <v-col
        offset="1/2"
        offset-lg="0"
        offset-md="1/3"
      >
        <v-sheet class="pa-2" color="blue-darken-2">grow | offset:1/2<br>grow | offset-md:1/3<br>grow | offset-lg:0</v-sheet>
      </v-col>

      <v-col
        cols="1/2"
        lg="1/4"
        md="1/3"
      >
        <v-sheet class="pa-2" color="yellow-darken-3">1/2<br>md:1/3<br>lg:1/4</v-sheet>
      </v-col>

      <v-col
        cols="1/4"
        lg="1/2"
        md="1/3"
        offset="1/8"
        offset-lg="0"
        offset-md="1/6"
      >
        <v-sheet class="pa-2" color="green-darken-1">1/4 | offset:1/8<br>md:1/3 | offset-md:1/6<br>lg:1/2 | offset-lg:0</v-sheet>
      </v-col>
    </v-row>
  </v-container>
</template>
