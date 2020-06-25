<template functional>
  <app-md
    class="v-example-missing text-center"
    v-text="parent.$t('missing', data.attrs)"
  />
</template>

<script>
  export default { name: 'ExampleMissing' }
</script>

<style lang="sass">
  .v-example-missing > p
    margin: 0
</style>
