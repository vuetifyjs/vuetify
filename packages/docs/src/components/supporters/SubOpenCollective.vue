<template>
  <v-layout
    id="open-collective"
    mb-12
    tag="section"
    wrap
  >
    <v-flex xs12>
      <doc-heading>openCollective</doc-heading>
    </v-flex>

    <v-flex
      xs12
      my-2
      tag="v-divider"
    />

    <v-flex xs12 mb-4>
      <doc-markdown>openCollectiveBlurb</doc-markdown>
    </v-flex>

    <v-flex
      xs12
      text-center
    >
      <core-open-collective-btn />
    </v-flex>
  </v-layout>
</template>
