<template>
  <v-container
    v-if="structure !== false"
    :id="composite"
    class="page"
  >
    <template v-if="structure">
      <v-layout>
        <v-flex shrink>
          <doc-heading v-if="structure.title">
            {{ structure.title }}
          </doc-heading>
        </v-flex>
        <v-spacer />
        <v-flex
          v-if="structure.file"
          shrink
        >
          <core-file-btn :link="structure.file" :branch="branch" />
        </v-flex>
        <v-flex
          v-if="structure.mdSpec"
          shrink
        >
          <core-spec-btn
            :link="structure.mdSpec.link"
            :version="structure.mdSpec.version"
          />
        </v-flex>
      </v-layout>

      <div
        v-if="structure.titleText"
        class="mb-12"
      >
        <doc-text class="mb-6">
          {{ structure.titleText }}
        </doc-text>
      </div>

      <component
        :is="getComponent(child.type)"
        v-for="(child, i) in structure.children"
        :key="`${composite}-${i}`"
        :value="child"
      />

      <doc-contribution :branch="branch" />
    </template>
  </v-container>
  <not-found v-else />
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'
  import { getComponent, getBranch } from '@/util/helpers'

  export default {
    components: {
      NotFound: () => import('@/pages/general/404'),
    },

    data: () => ({
      timeout: null,
      branch: null,
    }),

    computed: {
      ...mapState('documentation', ['structure']),
      ...mapState('route', ['params']),
      composite () {
        return `${this.params.namespace}-${this.params.page}`
      },
    },

    watch: {
      '$route.path': 'init',
    },

    mounted () {
      this.init()

      this.branch = getBranch()
    },

    methods: {
      getComponent,
      async init () {
        clearTimeout(this.timeout)

        this.timeout = setTimeout(() => {
          const sameInternal = this.$el.querySelectorAll('a.markdown--same-internal')

          Array.prototype.forEach.call(sameInternal, el => {
            el.addEventListener('click', this.onSameInternalClick)
          })

          const internal = this.$el.querySelectorAll('a.markdown--internal')

          Array.prototype.forEach.call(internal, el => {
            el.addEventListener('click', this.onInternalClick)
          })
        }, 300)
      },
      onSameInternalClick (e) {
        e.preventDefault()

        this.$router.push(e.target)
      },
      onInternalClick (e) {
        e.preventDefault()

        const target = e.target.tagName === 'A'
          ? e.target
          : e.target.parentElement

        const lang = `/${this.params.lang}`
        const length = lang.length
        let href = target.getAttribute('href')

        // If missing leading forward slash
        if (href.charAt(0) !== '/') {
          href = `/${href}`
        }

        // If missing language
        if (href.slice(0, length) !== lang) {
          href = `${lang}${href}`
        }

        this.$router.push(href)
      },
    },
  }
</script>

<style lang="sass">
.page
  max-width: 1185px

#components-navigation-drawers
  .v-sheet,
  .v-card
    overflow: hidden
</style>
