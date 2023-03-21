<template>
  <app-btn
    :to="rpath('/introduction/sponsors-and-backers/')"
    class="ms-1"
    color="medium-emphasis"
    variant="text"
    text="sponsor"
    @click="onClick"
  />
</template>

<script setup>
  // Composables
  import { useGtag } from 'vue-gtag-next'
  import { useRoute } from 'vue-router'

  // Utilities
  import { rpath } from '@/util/routes'

  const { event } = useGtag()
  const { name } = useRoute()

  function onClick () {
    event('click', {
      event_category: 'app-bar',
      event_label: 'sponsor',
      value: name,
    })
  }
</script>
