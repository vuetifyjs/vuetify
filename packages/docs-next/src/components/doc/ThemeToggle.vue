<template>
  <v-btn
    icon
    @click="toggle"
  >
    <v-icon v-text="icon" />
  </v-btn>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'ThemeToggle',

    computed: {
      ...sync('user', [
        'dark',
        'mixed',
      ]),
      icon () {
        if (this.dark) return '$mdiThemeLightDark'

        return `$mdiBrightness${this.mixed ? '7' : '4'}`
      },
    },

    watch: {
      dark (val) {
        this.$vuetify.theme.dark = val
      },
    },

    methods: {
      toggle () {
        if (this.mixed) {
          this.mixed = false

          return
        } else if (this.dark) {
          this.mixed = true
        }

        this.dark = !this.dark
      },
    },
  }
</script>
