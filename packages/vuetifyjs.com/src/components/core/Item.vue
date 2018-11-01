<template>
  <v-list-tile
    :to="path"
    ripple
  >
    <v-list-tile-action v-if="icon">
      <v-icon v-text="icon" />
    </v-list-tile-action>
    <v-list-tile-content>
      <v-list-tile-title v-text="text" />
    </v-list-tile-content>
  </v-list-tile>
</template>

<script>
  export default {
    props: {
      text: {
        type: String,
        default: ''
      },
      name: {
        type: String,
        default: ''
      },
      icon: {
        type: [Boolean, String],
        default: false
      },
      to: {
        type: String,
        default: undefined
      }
    },

    computed: {
      path () {
        if (!this.to) return this.to

        const lang = this.$route.params.lang || 'en'

        return {
          path: `/${lang}/${this.to}`
        }
      }
    }
  }
</script>
