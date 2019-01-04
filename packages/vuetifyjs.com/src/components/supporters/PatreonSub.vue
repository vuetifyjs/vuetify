<template>
  <v-layout
    id="patreon"
    mb-5
    tag="section"
    wrap
  >
    <v-flex xs12>
      <doc-heading goto="one-time-donation">patreon</doc-heading>
    </v-flex>

    <v-flex
      xs12
      my-2
      tag="v-divider"
    />

    <v-flex xs12>
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
