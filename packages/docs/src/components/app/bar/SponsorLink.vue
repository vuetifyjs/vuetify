<template>
  <AppBtn
    :to="rpath('/introduction/sponsors-and-backers/')"
    class="ms-1"
    color="medium-emphasis"
    text="sponsor"
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
      event_label: 'sponsor',
      value: name,
    })
  }
</script>
