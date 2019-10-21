<template>
  <v-layout
    id="tidelift"
    mb-12
    tag="section"
    wrap
  >
    <v-flex xs12>
      <base-heading>tidelift</base-heading>
    </v-flex>

    <v-flex
      xs12
      my-2
      tag="v-divider"
    />

    <v-flex
      xs12
      mb-4
    >
      <base-markdown>tideliftBlurb</base-markdown>
    </v-flex>

    <v-flex
      xs12
      text-center
    >
      <core-tidelift-btn />
    </v-flex>
  </v-layout>
</template>
