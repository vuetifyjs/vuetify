<template>
  <app-btn
    variant="text"
    :to="to"
    text="team"
    @click="onClick"
  />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
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
        to: {
          // name: 'Documentation',
          // params: {
          //   category: 'about',
          //   page: 'meet-the-team',
          // },
        },
        onClick,
      }
    },
  })
</script>
