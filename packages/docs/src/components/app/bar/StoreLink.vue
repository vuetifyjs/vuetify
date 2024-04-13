<template>
  <AppBtn
    color="medium-emphasis"
    href="https://store.vuetifyjs.com/?utm_source=vuetifyjs.com&utm_medium=toolbar"
    icon="mdi-cart-outline"
    rel="noopener"
    target="_blank"
    @click="onClick"
  />
</template>

<script setup>
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
