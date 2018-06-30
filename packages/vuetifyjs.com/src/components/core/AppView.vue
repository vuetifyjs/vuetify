<template>
  <v-content>
    <router-view />
    <translation-bar v-if="isTranslating" />
  </v-content>
</template>

<script>
  import { mapState } from 'vuex'

  export default {
    computed: {
      ...mapState('translation', {
        isTranslating: state => state.isTranslating
      })
    }
  }
</script>
