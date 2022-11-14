<template>
  <app-md
    class="v-example-missing text-center"
    v-text="parent.$t('missing', data.attrs)"
  />
</template>

<script setup>
  //
</script>

<style lang="sass">
  .v-example-missing > p
    margin: 0
</style>
