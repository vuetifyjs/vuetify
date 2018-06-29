<template>
  <v-content>
    <v-fade-transition mode="out-in">
      <router-view :key="$route.path" />
    </v-fade-transition>
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
