<template>
  <v-tooltip left bottom>
    <v-btn
      slot="activator"
      :href="`https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/${link}`"
      icon
      target="_blank"
      rel="noopener"
      aria-label="Source"
    >
      <v-icon>mdi-source-repository</v-icon>
    </v-btn>
    <span>Source</span>
  </v-tooltip>
</template>

<script>
  export default {
    props: {
      link: {
        type: String,
        default: ''
      }
    }
  }
</script>
