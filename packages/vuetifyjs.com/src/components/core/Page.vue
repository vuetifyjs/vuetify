<template>
  <v-container
    id="page"
    fluid
  >
    <not-found-page v-if="structure === false" />

    <template v-else-if="structure">
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
    </template>
  </v-container>
</template>

<script>
  // Utilities
  import { getComponent } from '@/util/helpers'
  import kebabCase from 'lodash/kebabCase'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'
  import NotFoundPage from '@/pages/general/404Page.vue'

  // TODO: This is where 404 redirect will occur
  export default {
    components: {
      NotFoundPage
    },

    provide () {
      return {
        namespace: upperFirst(camelCase(this.namespace)),
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

      import(
        /* webpackChunkName: "pages" */
        `@/data/pages/${namespace}/${page}.json`
      ).then(res => {
        this.structure = res.default
      }).catch(() => {
        // Add 404
        this.structure = false
        throw new Error(`Unable to find page for <${namespace}/${page}>`)
      })
    },

    mounted () {
      // Wait for page animation
      setTimeout(this.init, 300)
    },

    methods: {
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

        this.$vuetify.goTo(e.target.href, { offset: -80 })
      },
      onInternalClick (e) {
        e.preventDefault()

        this.$router.push(e.target.getAttribute('href'))
      }
    }
  }
</script>
