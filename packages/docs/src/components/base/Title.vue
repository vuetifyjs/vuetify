<template>
  <a
    class="base-title"
    @click.prevent="onClick"
  >
    <doc-markdown v-bind="$attrs"><slot /></doc-markdown>
  </a>
</template>

<script>
  export default {
    name: 'BaseTitle',

    methods: {
      onClick (e) {
        e.stopPropagation()

        this.$router.push(this.href)
      },
    },
  }
</script>

<style lang="sass">
  .base-title
    h1
      color: rgba(0, 0, 0, 0.87)
      display: inline-flex
      font-size: 3rem
      font-weight: 300
</style>
