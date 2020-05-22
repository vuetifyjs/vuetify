<template>
  <v-sheet
    class="d-inline-block my-3"
    outlined
    rounded
    v-bind="$attrs"
    v-on="$listeners"
  >
    <slot />
  </v-sheet>
</template>

<script>
  export default {
    name: 'AppAd',

    props: {
      comfortable: Boolean,
      compact: Boolean,
    },

    data: () => ({
      density: {
        normal: [],
      },
    }),

    computed: {
      normal () {
        return !this.comfortable && !this.compact
      },
      styles () {
        return {

        }
      },
    },
  }
</script>
