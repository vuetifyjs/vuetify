<template>
  <AppBtn
    :to="rpath('/about/meet-the-team/')"
    class="ms-1"
    color="medium-emphasis"
    text="team"
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
      event_label: 'team',
      value: name,
    })
  }
</script>
