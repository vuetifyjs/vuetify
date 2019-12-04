<template>
  <v-container px-0>
    <v-card
      id="vuetify-2-0"
      outlined
      class="mb-12"
      tag="section"
    >
      <v-card-title>
        <doc-subheading>2header</doc-subheading>
      </v-card-title>
      <v-card-text>
        <base-markdown>2text</base-markdown>

        <base-markdown>2features</base-markdown>

        <base-markdown>2upgrade</base-markdown>
      </v-card-text>
    </v-card>

    <v-card
      id="vuetify-1-5-lts"
      outlined
      tag="section"
    >
      <v-card-title>
        <doc-subheading>15header</doc-subheading>
      </v-card-title>
      <v-card-text>
        <base-markdown>15text</base-markdown>

        <base-markdown>15text2</base-markdown>

        <base-markdown>15versions</base-markdown>

        <base-markdown>15text3</base-markdown>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    inheritAttrs: false,
  }
</script>
