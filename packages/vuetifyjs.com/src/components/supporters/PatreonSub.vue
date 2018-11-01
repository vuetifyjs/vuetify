<template>
  <v-layout
    id="patreon"
    mb-5
    tag="section"
    wrap
  >
    <v-flex xs12>
      <core-subtitle goto="one-time-donation">patreon</core-subtitle>
    </v-flex>

    <v-flex
      xs12
      my-3
      tag="v-divider"
    />

    <v-flex
      xs12
      tag="p"
    >
      <core-markdown>patreonBlurb</core-markdown>
    </v-flex>

    <v-flex
      xs12
      text-xs-center
    >
      <core-patreon-btn />
    </v-flex>
  </v-layout>
</template>
