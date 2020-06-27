<template>
  <v-btn
    icon
    @click="advanced = !advanced"
  >
    <v-icon v-text="aicon" />
  </v-btn>
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'

  export default {
    name: 'AdvancedToggle',

    computed: {
      advanced: sync('user/drawer@advanced'),

      aicon () {
        const icon = this.advanced ? 'Bool' : 'Alphabetical'

        return `$mdiOrder${icon}Ascending`
      },
    },
  }
</script>
