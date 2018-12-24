<template>
  <v-container
    id="page"
    fluid
  >
    <template v-if="structure">
      <doc-heading>
        {{ structure.title }}
      </doc-heading>
      <div class="mb-5">
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

  // TODO: This is where 404 redirect will occur
  export default {
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

    created () {
      const namespace = kebabCase(this.namespace)
      const page = upperFirst(camelCase(this.page))

      this.setIsLoading(true)

      import(
        /* webpackChunkName: "pages" */
        `@/data/pages/${namespace}/${page}.json`
      ).then(res => {
        this.structure = res.default
      }).catch(() => {
        // Add 404
        this.structure = false
        this.$router.push({ name: '404' })
        throw new Error(`Unable to find page for <${namespace}/${page}>`)
      }).finally(() => {
        this.$nextTick(this.setIsLoading)
      })
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
