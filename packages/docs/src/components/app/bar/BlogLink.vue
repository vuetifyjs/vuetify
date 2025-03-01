<template>
  <v-badge color="success" offset-x="8" offset-y="8" dot>
    <AppBtn
      :to="rpath('/blog/')"
      class="me-1"
      color="medium-emphasis"
      text="blog"
      variant="text"
      @click="onClick"
    />
  </v-badge>
</template>

<script setup>
  const { event } = useGtag()
  const { name } = useRoute()

  function onClick () {
    event('click', {
      event_category: 'app-bar',
      event_label: 'blog',
      value: name,
    })
  }
</script>
