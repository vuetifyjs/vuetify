<template>
  <div class="flex-1-1-auto d-flex align-center justify-end">
    <!-- will be refactored to be a modal like vue sites
    <default-search v-if="branch === 'master'" />
    -->
    <template v-if="smAndUp">
      <docs-vertical-divider />

      <!-- <menus-learn /> blocked by v-menu -->

      <!-- <menus-support /> blocked by v-menu -->

      <template v-if="mdAndUp">

        <docs-links-team />

        <docs-vertical-divider />

        <!-- <docs-links-store /> -->

        <!-- <toggles-settings /> -->

        <!-- <docs-links-jobs /> -->

        <!-- <menus-notifications /> blocked by v-menu -->

      </template>
    </template>

    <docs-vertical-divider v-if="smOnly" />

    <v-spacer v-else-if="xsOnly" />

    <!-- <menus-language /> blocked by v-menu -->

  </div>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { useDisplay } from 'vuetify/lib/composables/display.mjs'
  // import { getBranch } from '@/util/helpers'

  export default defineComponent({
    name: 'DefaultAppBarItems',

    setup () {
      const {
        mdAndUp,
        smAndUp,
        smOnly,
        xsOnly,
      } = useDisplay()

      // data
      const branch = 'next' // getBranch()

      return {
        branch,
        mdAndUp,
        smAndUp,
        smOnly,
        xsOnly,
      }
    },

  })
</script>
