<template>
  <v-container fluid>
    <template v-if="structure">
      <doc-title>
        {{ structure.title }}
      </doc-title>
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

  // TODO: This is where 404 redirect will occur
  export default {
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
        throw new Error(`Unable to find page for <${namespace}/${page}>`)
      })
    },

    methods: { getComponent }
  }
</script>
