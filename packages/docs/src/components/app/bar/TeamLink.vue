<template>
  <app-btn
    :to="rpath('/introduction/meet-the-team/')"
    class="ms-1"
    color="medium-emphasis"
    text="team"
    variant="text"
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
      event_label: 'team',
      value: name,
    })
  }
</script>
