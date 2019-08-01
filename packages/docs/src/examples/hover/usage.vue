<template>
  <v-layout
    align-center
    justify-center
  >
    <v-flex xs12>
      <v-hover v-slot:default="{ hover }">
        <v-card
          :elevation="hover ? 12 : 2"
          class="mx-auto"
          height="350"
          max-width="350"
        >
          <v-card-text class="my-4 text-center title">Hover over me!</v-card-text>
        </v-card>
      </v-hover>
    </v-flex>
  </v-layout>
</template>
