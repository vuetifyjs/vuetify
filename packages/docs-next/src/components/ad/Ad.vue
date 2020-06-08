<template>
  <v-sheet
    :style="styles"
    class="d-inline-block my-2"
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
