<template>
  <app-tooltip-btn
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    path="store"
    icon
    rel="noopener"
    target="_blank"
    @click="onClick"
  >
    <template #icon>
      <v-icon
        color="medium-emphasis"
        icon="mdi-shopping-outline"
      />
    </template>
  </app-tooltip-btn>
</template>

<script lang="ts">
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'

  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'TeamLink',

    components: { AppTooltipBtn },

    setup () {
      const { name } = useRoute()
      const { event } = useGtag()

      return {
        onClick () {
          event('click', {
            event_category: 'app-bar',
            event_label: 'store',
            value: name,
          })
        },
      }
    },
  })
</script>
