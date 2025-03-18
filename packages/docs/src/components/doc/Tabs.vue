<template>
  <v-tabs
    v-model="model"
    class="mb-1"
    color="primary"
    height="44"
  >
    <slot name="tabs" />
  </v-tabs>

  <v-window v-model="model">
    <slot name="content" />
  </v-window>
</template>

<script setup>
  const model = shallowRef()
</script>
