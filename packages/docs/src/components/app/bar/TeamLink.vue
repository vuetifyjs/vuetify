<template>
  <app-btn
    color="medium-emphasis"
    variant="text"
    :to="rpath('/about/meet-the-team')"
    text="team"
    @click="onClick"
  />
</template>

<script lang="ts">
  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'

  // Utilities
  import { defineComponent } from 'vue'
  import { rpath } from '@/util/routes'

  export default defineComponent({
    name: 'TeamLink',

    setup () {
      const { event } = useGtag()
      const { name } = useRoute()

      return {
        onClick () {
          event('click', {
            event_category: 'app-bar',
            event_label: 'team',
            value: name,
          })
        },
        rpath,
      }
    },
  })
</script>
