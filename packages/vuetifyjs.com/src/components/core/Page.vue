<template>
  <v-container
    v-if="structure !== false"
    id="page"
  >
    <template v-if="structure">
      <doc-heading v-if="structure.title">
        {{ structure.title }}
      </doc-heading>
      <div
        v-if="structure.titleText"
        class="mb-5"
      >
        <doc-text
          v-if="structure.titleText"
          class="mb-4"
        >
          {{ structure.titleText }}
        </doc-text>
      </div>

      <component
        v-for="(child, i) in structure.children"
        :key="`${composite}-${i}`"
        :is="getComponent(child.type)"
        :value="child"
      />

      <doc-contribution />
    </template>
  </v-container>
  <not-found v-else />
</template>

<script>
  // Utilities
  import {
    mapMutations
  } from 'vuex'
  import { getComponent } from '@/util/helpers'
  import kebabCase from 'lodash/kebabCase'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'

  export default {
    components: {
      NotFound: () => import('@/pages/general/404')
    },

    provide () {
      return {
        namespace: upperFirst(camelCase(this.namespace)),
        lang: this.lang,
        page: upperFirst(camelCase(this.page))
      }
    },

    props: {
      // Provided by router
      namespace: {
        type: String,
        default: undefined
      },
      page: {
        type: String,
        default: undefined
      },
      lang: {
        type: String,
        default: undefined
      }
    },

    data: () => ({
      structure: undefined
    }),

    computed: {
      composite () {
        return `${this.namespace}-${this.page}`
      }
    },

    async created () {
      const namespace = kebabCase(this.namespace)
      const page = upperFirst(camelCase(this.page))

      this.setIsLoading(true)

      try {
        this.structure = (await import(
          /* webpackChunkName: "pages" */
          `@/data/pages/${namespace}/${page}.json`
        )).default
      } catch (err) {
        this.structure = false
      }

      this.setIsLoading(false)
    },

    mounted () {
      // Wait for page animation
      setTimeout(this.init, 300)
    },

    methods: {
      ...mapMutations('app', ['setIsLoading']),
      getComponent,
      init () {
        const sameInternal = this.$el.querySelectorAll('a.markdown--same-internal')

        Array.prototype.forEach.call(sameInternal, el => {
          el.addEventListener('click', this.onSameInternalClick)
        })

        const internal = this.$el.querySelectorAll('a.markdown--internal')

        Array.prototype.forEach.call(internal, el => {
          el.addEventListener('click', this.onInternalClick)
        })
      },
      onSameInternalClick (e) {
        e.preventDefault()

        this.$router.push(e.target)
      },
      onInternalClick (e) {
        e.preventDefault()

        this.$router.push(`/${this.lang}${e.target.getAttribute('href')}`)
      }
    }
  }
</script>

<style>
#page {
  max-width: 1185px;
}
</style>
