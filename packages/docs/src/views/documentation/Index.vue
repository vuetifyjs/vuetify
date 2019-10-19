<template>
  <base-section
    v-if="structure !== false"
    id="documentation"
    class="page"
  >
    Hello
  </base-section>

  <not-found v-else />
</template>

<script>
  // Utilities
  // import { getComponent, getBranch } from '@/util/helpers'
  import kebabCase from 'lodash/kebabCase'
  import {
    get,
    sync,
  } from 'vuex-pathify'

  export default {
    name: 'Documentation',

    components: {
      NotFound: () => import(
        /* webpackChunkName: "notfound" */
        '@/pages/general/404'
      ),
    },

    provide () {
      return {
        id: this.id,
      }
    },

    data: () => ({
      branch: null,
      timeout: null,
    }),

    computed: {
      ...get('documentation/*'),
      ...sync('documentation/*'),
      composite () {
        return `${this.$route.params.namespace}-${this.$route.params.page}`
      },
      id () {
        if (!this.structure) return

        return kebabCase(this.$t(
          `${this.$route.params.namespace}.${this.$store.params.page}.${this.structure.title}`
        ))
      },
    },

    // watch: {
    //   '$route.path': 'init',
    // },

    // mounted () {
    //   this.init()

    //   this.branch = getBranch()
    // },

    methods: {
      // getComponent,
    //   async init () {
    //     clearTimeout(this.timeout)

    //     this.timeout = setTimeout(() => {
    //       const sameInternal = this.$el.querySelectorAll('a.markdown--same-internal')

    //       Array.prototype.forEach.call(sameInternal, el => {
    //         el.addEventListener('click', this.onSameInternalClick)
    //       })

    //       const internal = this.$el.querySelectorAll('a.markdown--internal')

    //       Array.prototype.forEach.call(internal, el => {
    //         el.addEventListener('click', this.onInternalClick)
    //       })
    //     }, 300)
    //   },
    //   onSameInternalClick (e) {
    //     e.preventDefault()

    //     this.$router.push(e.target)
    //   },
    //   onInternalClick (e) {
    //     e.preventDefault()

    //     const target = e.target.tagName === 'A'
    //       ? e.target
    //       : e.target.parentElement

    //     const lang = `/${this.$route.params.lang}`
    //     const length = lang.length
    //     let href = target.getAttribute('href')

    //     // If missing leading forward slash
    //     if (href.charAt(0) !== '/') {
    //       href = `/${href}`
    //     }

    //     // If missing language
    //     if (href.slice(0, length) !== lang) {
    //       href = `${lang}${href}`
    //     }

    //     this.$router.push(href)
    //   },
    },
  }
</script>

<style lang="sass">
  #components-navigation-drawers
    .v-sheet,
    .v-card
      overflow: hidden
</style>
