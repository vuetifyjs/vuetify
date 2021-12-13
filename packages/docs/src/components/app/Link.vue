<template>
  <component
    :is="tag"
    class="app-link text-decoration-none primary--text font-weight-medium d-inline-flex align-center"
    v-bind="attrs"
    @click="onClick"
  >
    <template v-if="iconProps && isSamePage">
      <VIcon v-bind="iconProps" />
    </template>
    <slot />
    <template v-if="iconProps && !isSamePage">
      <VIcon v-bind="iconProps" />
    </template>
  </component>
</template>

<script lang="ts">
  import { computed } from 'vue'

  export default {
    name: 'AppLink',

    inheritAttrs: false,

    props: {
      href: {
        type: String,
        default: '',
      },
    },

    setup (props) {
      const isExternal = computed(() => props.href.startsWith('http') || props.href.startsWith('mailto'))
      const isSamePage = computed(() => !isExternal.value && props.href.startsWith('#'))
      const attrs = computed(() => {
        return isExternal.value
          ? { href: props.href, target: '_blank', rel: 'noopener' }
          : {
            to: {
              // path: props.isSamePage ? props.href : rpath(props.href),
              path: props.href,
            },
          }
      })

      // vue-router scroll-behavior is skipped
      // on same page hash changes. Manually
      // run $vuetify goTo scroll function
      function onClick (e: Event) {
        if (!isSamePage.value) return

        e.preventDefault()

        // this.$vuetify.goTo(this.href)
      }

      const icon = computed(() => {
        if (isSamePage.value) return 'mdi-pound'
        if (isExternal.value) return 'mdi-open-in-new'
        if (props.href) return 'mdi-page-next'

        return null
      })

      const iconProps = computed(() => {
        if (!icon.value) return null

        return {
          icon: icon.value,
          class: `m${isSamePage.value ? 'r' : 'l'}-1`,
          color: 'primary',
          size: '.875rem',
        }
      })

      return {
        tag: computed(() => isExternal.value ? 'a' : 'router-link'),
        isExternal,
        isSamePage,
        onClick,
        attrs,
        iconProps,
      }
    },
  }
</script>

<style lang="sass">
  .app-link
    p
      margin-bottom: 0
</style>
