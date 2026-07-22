<template>
  <v-container>
    <v-row justify="center">
      <v-col
        v-for="(_, n) in 6"
        :key="n"
        cols="auto"
      >
        <v-card
          :elevation="n"
          class="d-flex justify-center align-center"
          height="70"
          rounded="xl"
          style="--v-shadow-color: 0, 0, 255"
          width="100"
        >
          <div>{{ n }}</div>
        </v-card>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col
        v-for="(_, n) in 6"
        :key="n"
        cols="auto"
      >
        <v-card
          :elevation="n"
          class="d-flex justify-center align-center elevation-overlay"
          color="surface"
          height="70"
          rounded="xl"
          style="--v-elevation-overlay-color: red"
          width="100"
        >
          <div>{{ n }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
