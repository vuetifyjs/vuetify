<template>
  <v-tooltip left bottom>
    <template #activator="{ on }">
      <v-btn
        :href="`https://github.com/vuetifyjs/vuetify/tree/master/packages/vuetify/src/${link}`"
        icon
        target="_blank"
        rel="noopener"
        aria-label="Source"
        v-on="on"
      >
        <v-icon>mdi-source-repository</v-icon>
      </v-btn>
    </template>
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
