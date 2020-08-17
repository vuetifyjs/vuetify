<template>
  <v-row dense>
    <v-col
      v-for="(to, i) in related"
      :key="i"
      cols="12"
      sm="6"
      lg="4"
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

    computed: { related: get('pages/frontmatter@related') },
  }
</script>
