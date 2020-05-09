<template>
  <div
    class="base-title"
    @click.prevent="onClick"
  >
    <slot :attrs="$attrs" />
  </div>
</template>

<script>
  // Components
  import Themeable from 'vuetify/es5/mixins/themeable'

  export default {
    name: 'BaseTitle',

    mixins: [Themeable],

    methods: {
      onClick (e) {
        if (!this.href) return

        e.stopPropagation()

        this.$router.push(this.href)
      },
    },
  }
</script>

<style lang="sass">
  .base-title
    display: inline-block

    h1, h2, h3, h4, h5, h6
      display: inline-flex

      &.theme--light
        color: rgba(0, 0, 0, 0.87)

      &.theme--dark
        color: #FFFFFF

    h1
      font-size: 3rem
      font-weight: 300

    h2
      font-size: 2rem
      font-weight: 500

    h3
      font-size: 1.5rem
      font-weight: 500
</style>
