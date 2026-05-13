<template>
  <v-container>
    <v-row class="justify-center">
      <v-col
        v-for="(_, n) in 6"
        :key="n"
        cols="auto"
      >
        <v-card
          :elevation="n"
          class="d-flex justify-center align-center elevation-overlay"
          height="100"
          rounded="xl"
          width="100"
        >
          <div>{{ n }}</div>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>
