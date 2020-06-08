<template>
  <v-row>
    <v-col
      v-for="(to, i) in related"
      :key="i"
      cols="12"
      md="4"
    >
      <related-page :to="to" />
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'RelatedPages',

    computed: { related: get('i18n/frontmatter@related') },
  }
</script>
