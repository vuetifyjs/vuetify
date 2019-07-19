<template>
  <v-layout
    id="patreon"
    mb-5
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

    <v-flex xs12 mb-3>
      <doc-markdown>githubBlurb</doc-markdown>
    </v-flex>

    <v-flex
      xs12
      text-xs-center
    >
      <core-github-btn />
    </v-flex>
  </v-layout>
</template>
