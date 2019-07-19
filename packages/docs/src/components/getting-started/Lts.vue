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
        <doc-markdown>2text</doc-markdown>

        <doc-markdown>2features</doc-markdown>

        <doc-markdown>2upgrade</doc-markdown>
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
        <doc-markdown>15text</doc-markdown>

        <doc-markdown>15text2</doc-markdown>

        <doc-markdown>15versions</doc-markdown>

        <doc-markdown>15text3</doc-markdown>
      </v-card-text>
    </v-card>
  </v-container>
</template>

<script>
  export default {
    inherritAttrs: false,
  }
</script>
