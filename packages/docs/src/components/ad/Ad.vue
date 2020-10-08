<template>
  <v-sheet
    :style="styles"
    class="v-app-ad d-inline-flex flex-child-1 grow-shrink-0 my-2"
    rounded
    width="100%"
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-sheet>
</template>

<script>
  // Mixins
  import Density from '@/mixins/density'

  // Utilities
  import { convertToUnit } from 'vuetify/lib/util/helpers'

  export default {
    name: 'AppAd',

    mixins: [Density],

    inheritAttrs: false,

    computed: {
      minHeight () {
        if (this.compact) return 52
        if (this.comfortable) return 74

        return 118
      },
      styles () {
        return {
          minHeight: convertToUnit(this.minHeight),
        }
      },
    },
  }
</script>

<style lang="sass">
  .v-app-ad
    a
      text-decoration: none

    .v-markdown p
      margin-bottom: 0
</style>
