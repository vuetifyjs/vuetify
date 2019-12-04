<template>
  <div class="pt-6">
    <v-skeleton-loader
      max-width="500"
      type="heading"
    />

    <v-skeleton-loader
      :types="types"
      type="spacer, paragraph, spacer@4"
    />

    <v-skeleton-loader
      class="d-inline-block"
      height="133"
      type="image"
      width="362"
    />

    <v-skeleton-loader
      :types="types"
      max-width="50%"
      type="spacer@2, heading, spacer@2"
    />

    <v-skeleton-loader
      :types="types"
      type="sentences, spacer@6"
    />

    <v-skeleton-loader type="table-heading, image" />
  </div>
</template>

<script>
  export default {
    name: 'PageSkeletonLoader',

    data: () => ({
      types: { spacer: 'spacer' },
    }),
  }
</script>

<style lang="sass">
  .v-skeleton-loader__spacer
    margin: 8px 0
</style>
