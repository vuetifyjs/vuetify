<template>
  <div>
    <!-- TODO: resolve style issues -->
    <app-markdown
      v-if="ad"
      :content="description"
      class="v-markdown--inline d-inline"
      tag="span"
    />
  </div>
</template>

<script setup>
  // Composables
  import { createAdProps, useAd } from '@/composables/ad'

  const props = defineProps(createAdProps())

  const { ad, description } = useAd(props)
</script>

<style lang="sass">
  .v-markdown--inline
    a
      font-weight: 500
      text-decoration: none
    p
      display: inline
      margin: 0
</style>
