<template>
  <AppBtn
    class="ms-1"
    color="medium-emphasis"
    href="https://play.vuetifyjs.com"
    rel="noopener noreferrer"
    target="_blank"
    text="playground"
    variant="text"
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
