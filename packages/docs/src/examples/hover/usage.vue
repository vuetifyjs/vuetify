<template>
  <v-layout
    align-center
    justify-center
    row
  >
    <v-flex xs12>
      <v-hover>
        <template v-slot:default="{ hover }">
          <v-card
            :elevation="hover ? 12 : 2"
            class="mx-auto"
            height="350"
            max-width="350"
          >
            <v-card-text class="my-3 text-xs-center title">Hover over me!</v-card-text>
          </v-card>
        </template>
      </v-hover>
    </v-flex>
  </v-layout>
</template>
