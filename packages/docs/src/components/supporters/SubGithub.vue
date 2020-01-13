<template>
  <v-layout
    id="patreon"
    mb-12
    tag="section"
    wrap
  >
    <v-flex xs12>
      <base-heading goto="one-time-donation">github</base-heading>
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
      <base-markdown>githubBlurb</base-markdown>
    </v-flex>

    <v-flex
      xs12
      text-center
    >
      <core-github-btn />
    </v-flex>
  </v-layout>
</template>
