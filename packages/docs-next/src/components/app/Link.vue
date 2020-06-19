<template>
  <component
    :is="component"
    class="text-decoration-none primary--text font-weight-medium d-inline-flex align-center"
    v-bind="attrs"
  >
    <slot />

    <v-icon
      v-if="icon"
      class="ml-1"
      color="primary"
      size=".875rem"
      v-text="icon"
    />
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
  }
</script>
