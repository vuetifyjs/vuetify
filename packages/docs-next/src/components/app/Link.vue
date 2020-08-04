<template>
  <component
    :is="component"
    class="app-link text-decoration-none primary--text font-weight-medium d-inline-block"
    v-bind="attrs"
  >
    <div
      class="d-inline-flex align-center"
      @click="onClick"
    >
      <slot v-if="!isSamePage" />

      <v-icon
        v-if="icon"
        :class="`m${isSamePage ? 'r' : 'l'}-1`"
        color="primary"
        size=".875rem"
        v-text="icon"
      />

      <slot v-if="isSamePage" />
    </div>
  </component>
</template>

<script>
  export default {
    name: 'AppLink',

    inheritAttrs: false,

    props: {
      href: {
        type: String,
        default: '',
      },
    },

    computed: {
      attrs () {
        return this.isExternal
          ? { href: this.href, target: '_blank', rel: 'noopener' }
          : { to: this.href }
      },
      component () {
        return !this.isExternal ? 'router-link' : 'a'
      },
      icon () {
        if (this.isSamePage) return '$mdiPound'
        if (this.isExternal) return '$mdiOpenInNew'
        if (this.href) return '$mdiPageNext'

        return null
      },
      isExternal () {
        return (
          this.href.startsWith('http') ||
          this.href.startsWith('mailto')
        )
      },
      isSamePage () {
        return (
          !this.isExternal &&
          this.href.startsWith('#')
        )
      },
    },

    methods: {
      // vue-router scroll-behavior is skipped
      // on same page hash changes. Manually
      // run $vuetify goTo scroll function
      onClick (e) {
        if (!this.isSamePage) return

        e.preventDefault()

        this.$vuetify.goTo(this.href)
      },
    },
  }
</script>

<style lang="sass">
  .app-link
    p
      margin-bottom: 0
</style>
