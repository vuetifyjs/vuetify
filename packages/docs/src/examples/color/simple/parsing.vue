<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="color in ['primary', 'blue darken-3', '#1976D2', 'rgb(25, 118, 210)', 'rgba(25, 118, 210, 1)', 'hsl(210, 79%, 46%)']"
        :key="color"
        cols="12"
        md="4"
      >
        <div v-color="color" class="pa-2 text-center white--text">
          {{ color }}
        </div>
      </v-col>
    </v-row>
  </v-container>
</template>
