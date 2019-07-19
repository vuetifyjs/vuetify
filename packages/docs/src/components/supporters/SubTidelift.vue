<template>
  <v-layout
    id="tidelift"
    mb-12
    tag="section"
    wrap
  >
    <v-flex xs12>
      <doc-heading>tidelift</doc-heading>
    </v-flex>

    <v-flex
      xs12
      my-2
      tag="v-divider"
    />

    <v-flex xs12 mb-4>
      <doc-markdown>tideliftBlurb</doc-markdown>
    </v-flex>

    <v-flex
      xs12
      text-center
    >
      <core-tidelift-btn />
    </v-flex>
  </v-layout>
</template>
