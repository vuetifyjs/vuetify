<template>
  <app-tooltip-btn
    :icon="search ? '$close' : '$mdiMagnify'"
    path="search"
    @click="search = !search"
  />
</template>

<script>
  // Utilities
  import { sync } from 'vuex-pathify'
  import { IN_BROWSER } from '@/util/globals'

  export default {
    name: 'SearchToggle',

    computed: { search: sync('app/search') },

    watch: {
      async search (val) {
        if (!val || !IN_BROWSER) return

        const search = document.getElementById('doc-search')

        if (!search) return

        await this.$nextTick()

        search.focus()
      },
    },
  }
</script>
