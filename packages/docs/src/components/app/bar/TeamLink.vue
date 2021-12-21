<template>
  <app-btn
    variant="text"
    :to="rpath('/about/meet-the-team')"
    text="team"
    @click="onClick"
  />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  import { rpath } from '@/util/routes'
  // import { useRoute } from 'vue-router'

  export default defineComponent({
    name: 'TeamLink',

    setup () {
      // const route = useRoute()

      function onClick () {
        // this.$gtag.event('click', {
        //   event_category: 'toolbar',
        //   event_label: 'team',
        //   value: route.name,
        // })
      }

      return {
        onClick,
        rpath,
      }
    },
  })
</script>
