<template>
  <app-btn
    text="team"
    @click="onClick"
  />
</template>

<script lang="ts">
  // Composables
  // import { useRoute } from 'vue-router'

  // Utilities
  import { defineComponent } from 'vue'
  import { rpath } from '@/util/routes'

  export default defineComponent({
    name: 'TeamLink',

    setup () {
      // const route = useRoute()

      return {
        onClick () {
          // this.$gtag.event('click', {
          //   event_category: 'toolbar',
          //   event_label: 'team',
          //   value: route.name,
          // })
        },
        rpath,
      }
    },
  })
</script>
