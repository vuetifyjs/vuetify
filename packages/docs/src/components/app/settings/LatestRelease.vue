<template>
  <app-link-list-item
    :to="rpath(`/getting-started/release-notes/?version=v${version}`)"
    :title="`v${version}`"
    append-icon="mdi-page-next"
    label="Latest release"
    prepend-icon="mdi-label"
    @click="onClick"
  />
</template>

<script setup>
  // Utilities
  import { rpath } from '@/util/routes'
  import { version } from 'vuetify'

  // Stores
  import { useAppStore } from '@/store/app'

  const app = useAppStore()

  function onClick () {
    app.settings = false
  }
</script>
