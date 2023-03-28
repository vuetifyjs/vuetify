<template>
  <app-tooltip-btn
    color="medium-emphasis"
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="mdi-shopping-outline"
    path="store"
    rel="noopener"
    target="_blank"
    @click="onClick"
  />
</template>

<script setup>
  // Components
  import AppTooltipBtn from '@/components/app/TooltipBtn.vue'

  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'

  const { event } = useGtag()
  const { name } = useRoute()

  function onClick () {
    event('click', {
      event_category: 'app-bar',
      event_label: 'store',
      value: name,
    })
  }
</script>
