<template>
  <component
    :is="`h${level}`"
    :class="['v-heading', map[level]]"
    @click="onClick"
  >
    <slot />
  </component>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'AppHeading',

    props: { level: String },

    data: () => ({
      map: {
        1: 'text-h4 text-sm-h3 mb-4',
        2: 'text-h5 text-sm-h4 mb-3',
        3: 'text-h6 mb-2',
        4: 'text-subtitle-1 mb-2',
      },
    }),

    computed: { hash: get('route/hash') },

    methods: {
      onClick (e) {
        e.preventDefault()

        const link = this.$el.querySelector('.v-link')
        const hash = `#${link.href.split('#').pop()}`

        if (this.hash === hash) return

        this.$router.push(hash)
      },
    },
  }
</script>

<style lang="sass">
  .v-heading
    display: inline-block
    position: relative

    > .v-link
      bottom: 0
      display: inline-block
      left: 0
      margin-left: -2rem
      padding-right: 0.5rem
      position: absolute
      right: 0
      top: 0

      &:not(:hover):not(:focus)
        opacity: 0
</style>
