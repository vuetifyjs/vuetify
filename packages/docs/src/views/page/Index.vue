<template>
  <section
    v-if="structure !== false"
    :id="id"
  >
    <base-heading>heading</base-heading>

    <base-text>headingText</base-text>

    <v-card
      class="pa-4 d-inline-block my-6"
      color="grey lighten-3"
      flat
    >
      <ad-carbon />
    </v-card>

    <component
      :is="getComponent(child.type)"
      v-for="(child, i) in structure.children"
      :key="`${id}-${i}`"
      :value="child"
    />
  </section>

  <not-found v-else />
</template>

<script>
  // Utilities
  import {
    sync,
  } from 'vuex-pathify'
  import kebabCase from 'lodash/kebabCase'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'
  import { getComponent } from '@/util/helpers'

  async function load ({ route, store }) {
    const namespace = kebabCase(route.params.namespace)
    const page = upperFirst(camelCase(route.params.page))

    store.commit('documentation/SET_STRUCTURE', null)

    let structure

    try {
      structure = (await import(
        /* webpackChunkName: "documentation-pages" */
        `@/data/pages/${namespace}/${page}.json`
      )).default
    } catch (err) {
      structure = false
    }

    store.commit('documentation/SET_STRUCTURE', structure)
  }

  export default {
    name: 'Page',

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

    computed: {
      namespace: sync('route/params@namespace'),
      page: sync('route/params@page'),
      structure: sync('documentation/structure'),
      id () {
        if (!this.structure) return ''

        return kebabCase(this.$t(
          `${this.namespace}.${this.page}`
        ))
      },
      text () {
        if (!this.structure) return ''

        return `${camelCase(this.namespace)}.${camelCase(this.page)}.headingText`
      },
    },

    watch: {
      '$route.path' () {
        this.load({
          store: this.$store,
          route: this.$route,
        })
      },
    },

    asyncData: load,

    methods: {
      getComponent,
      load,
    },
  }
</script>
