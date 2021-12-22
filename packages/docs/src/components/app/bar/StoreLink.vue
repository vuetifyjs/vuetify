<template>
  <app-tooltip-btn
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="mdi-shopping-outline"
    path="store"
    rel="noopener"
    target="_blank"
    @click="onClick"
  />
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'
  // import { useRoute } from 'vue-router'
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  export default defineComponent({
    name: 'TeamLink',

    components: { AppTooltipBtn },

    setup () {
      // const route = useRoute()

      function onClick () {
        // this.$gtag.event('click', {
        //   event_category: 'toolbar',
        //   event_label: 'store',
        //   value: route.name,
        // })
      }

      return {
        onClick,
      }
    },
  })
</script>
