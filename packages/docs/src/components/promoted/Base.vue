<template>
  <v-sheet
    :style="styles"
    class="v-app-ad d-inline-flex flex-child-1 grow-shrink-0 mt-2 mb-4"
    color="grey-lighten-5"
    rounded
    width="100%"
    v-bind="$attrs"
  >
    <slot />
  </v-sheet>
</template>

<script lang="ts">
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'PromotedBase',

    inheritAttrs: false,

    props: {
      compact: Boolean,
      comfortable: Boolean,
    },

    computed: {
      minHeight () {
        if (this.compact) return 52
        if (this.comfortable) return 74

        return 118
      },
      styles () {
        return {
          minHeight: `${this.minHeight}px`,
        }
      },
    },
  })
</script>

<style lang="sass">
  .v-app-ad
    a
      text-decoration: none

    .v-markdown p
      margin-bottom: 0
</style>
