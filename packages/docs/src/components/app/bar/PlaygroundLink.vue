<template>
  <AppBtn
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
