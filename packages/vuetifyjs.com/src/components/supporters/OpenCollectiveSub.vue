<template>
  <v-layout
    id="open-collective"
    mb-5
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

    <v-flex xs12>
      <doc-markdown>openCollectiveBlurb</doc-markdown>
    </v-flex>

    <v-flex
      xs12
      text-xs-center
    >
      <core-open-collective-btn />
    </v-flex>
  </v-layout>
</template>
