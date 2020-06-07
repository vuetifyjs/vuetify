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
      height () {
        if (this.compact) return 48
        if (this.comfortable) return 74

        return 118
      },
      styles () {
        return {
          height: convertToUnit(this.height),
        }
      },
    },
  }
</script>
