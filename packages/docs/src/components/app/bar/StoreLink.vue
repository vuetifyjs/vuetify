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
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  // import { useRoute } from 'vue-router'

  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TeamLink',

    components: { AppTooltipBtn },

    setup () {
      // const route = useRoute()

      return {
        onClick () {
          // this.$gtag.event('click', {
          //   event_category: 'toolbar',
          //   event_label: 'store',
          //   value: route.name,
          // })
        },
      }
    },
  })
</script>
