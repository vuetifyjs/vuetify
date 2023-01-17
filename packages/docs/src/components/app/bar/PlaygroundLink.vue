<template>
  <app-btn
    href="https://play.vuetifyjs.com"
    target="_blank"
    rel="noopener noreferrer"
    class="ms-1"
    color="medium-emphasis"
    variant="text"
    text="playground"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'

  const { event } = useGtag()
  const { name } = useRoute()

  function onClick () {
    event('click', {
      event_category: 'app-bar',
      event_label: 'playground',
      value: name,
    })
  }
</script>
