<template>
  <v-layout
    id="patreon"
    mb-12
    tag="section"
    wrap
  >
    <v-flex xs12>
      <doc-heading goto="one-time-donation">github</doc-heading>
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
      <doc-markdown>githubBlurb</doc-markdown>
    </v-flex>

    <v-flex
      xs12
      text-center
    >
      <core-github-btn />
    </v-flex>
  </v-layout>
</template>
