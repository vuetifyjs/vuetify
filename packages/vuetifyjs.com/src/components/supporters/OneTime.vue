<template>
  <v-layout
    id="one-time-donation"
    tag="section"
    mb-5
    wrap
  >
    <v-flex xs12>
      <doc-heading goto="one-time-donation">oneTime</doc-heading>
    </v-flex>

    <v-flex
      xs12
      my-2
      tag="v-divider"
    />

    <v-flex
      xs12
      tag="p"
    >
      <doc-markdown>oneTimeBlurb</doc-markdown>
    </v-flex>

    <v-flex
      xs12
      text-xs-center
    >
      <v-img
        class="d-inline-block"
        src="https://cdn.vuetifyjs.com/images/social/paypal.png"
        width="150"
      />
    </v-flex>
  </v-layout>
</template>
