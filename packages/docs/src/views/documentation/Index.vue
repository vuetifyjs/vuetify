<template>
  <v-container
    v-if="structure !== false"
    page
  >
    <template v-if="structure">
      <section
        :id="id"
        class="mb-12"
      >
        <v-row>
          <v-col
            v-if="structure.title"
            class="shrink"
          >
            <doc-heading>
              {{ structure.title }}
            </doc-heading>
          </v-col>

          <v-spacer />

          <v-col
            v-if="structure.file"
            class="shrink"
          >
            <core-file-btn
              :link="structure.file"
              :branch="branch"
            />
          </v-col>

          <v-col
            v-if="structure.mdSpec"
            class="shrink"
          >
            <core-spec-btn
              :link="structure.mdSpec.link"
              :version="structure.mdSpec.version"
            />
          </v-col>
        </v-row>

        <div v-if="structure.titleText">
          <doc-text class="mb-6">
            {{ structure.titleText }}
          </doc-text>
        </div>
      </section>

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
    mapGetters,
    mapState,
  } from 'vuex'
  import { getComponent, getBranch } from '@/util/helpers'
  import kebabCase from 'lodash/kebabCase'

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
      timeout: null,
      branch: null,
    }),

    computed: {
      ...mapGetters('documentation', [
        'namespace',
        'page',
      ]),
      ...mapState('documentation', ['structure']),
      ...mapState('route', ['params']),
      composite () {
        return `${this.params.namespace}-${this.params.page}`
      },
      id () {
        if (!this.structure) return

        return kebabCase(this.$t(
          `${this.namespace}.${this.page}.${this.structure.title}`
        ))
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
  #components-navigation-drawers
    .v-sheet,
    .v-card
      overflow: hidden
</style>
