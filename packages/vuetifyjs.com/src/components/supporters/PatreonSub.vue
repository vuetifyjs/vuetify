<template>
  <v-layout
    id="patreon"
    mb-5
    tag="section"
    wrap
  >
    <v-flex xs12>
      <doc-subtitle goto="one-time-donation">patreon</doc-subtitle>
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
      <doc-markdown>patreonBlurb</doc-markdown>
    </v-flex>

    <v-flex
      xs12
      text-xs-center
    >
      <core-patreon-btn />
    </v-flex>
  </v-layout>
</template>
