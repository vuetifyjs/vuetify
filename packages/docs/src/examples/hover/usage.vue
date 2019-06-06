<template>
  <v-hover>
    <v-card
      slot-scope="{ hover }"
      :elevation="hover ? 12 : 2"
      class="mx-auto"
      height="350"
      width="350"
    >
      <v-card-text class="my-3 text-xs-center title">Hover over me!</v-card-text>
    </v-card>
  </v-hover>
</template>
