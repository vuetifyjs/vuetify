<template lang="pug">
  example-view(:data="data")
    section
</template>

<script>
  export default {
    computed: {
      components () {
        return this.$t('Components.Grid.components')
      },
      data () {
        return {
          folder: 'grid',
          components: this.components,
          examples: this.examples
        }
      },
      examples () {
        return this.$t('Components.Grid.examples')[0]
      }
    }
  }
</script>
