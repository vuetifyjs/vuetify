<template>
  <div class="d-flex ga-8 justify-center py-3">
    <v-avatar-group
      :items="items"
      border="md surface-variant opacity-100"
      vertical
    ></v-avatar-group>

    <v-avatar-group
      :items="items"
      border="md surface-variant opacity-100"
      reverse
      vertical
    ></v-avatar-group>
  </div>
</template>

<script setup>
  const items = Array.from({ length: 4 })
    .map((_, i) => ({ image: `https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/${i}.jpg` }))
</script>

<script>
  export default {
    data: () => ({
      items: Array.from({ length: 4 })
        .map((_, i) => ({ image: `https://vuetifyjs.b-cdn.net/docs/images/one/snips/avatars/${i}.jpg` })),
    }),
  }
</script>
