<template>
  <page-skeleton-loader v-if="isLoading" />

  <section
    v-else-if="structure !== false"
    :id="`${namespace}-${page}`"
    class="page"
  >
    <component
      :is="getComponent(child.type)"
      v-for="(child, i) in children"
      :key="`${id}-${i}`"
      :value="child"
    />
  </section>

  <not-found v-else />
</template>

<script>
  // Utilities
  import {
    get,
    sync,
  } from 'vuex-pathify'
  import kebabCase from 'lodash/kebabCase'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'
  import { getComponent } from '@/util/helpers'

  async function load ({ route, store }) {
    const namespace = kebabCase(route.params.namespace)
    const page = upperFirst(camelCase(route.params.page))
    const setStructure = structure => store.commit('documentation/SET_STRUCTURE', structure)

    store.commit('documentation/SET_STRUCTURE', null)

    await new Promise(resolve => setTimeout(resolve, 0))

    let structure
    this.isLoading = true

    try {
      structure = (await import(
        /* webpackChunkName: "documentation-pages" */
        `@/data/pages/${namespace}/${page}.json`
      )).default
    } catch (err) {
      setStructure(false)

      throw new Error(`Unable to find layout for route <${route.params.page}>.`)
    }

    setStructure(structure)
    this.isLoading = false
  }

  export default {
    name: 'Page',

    components: {
      NotFound: () => import(
        /* webpackChunkName: "notfound" */
        '@/pages/general/404'
      ),
      PageSkeletonLoader: () => import('./SkeletonLoader'),
    },

    provide () {
      return {
        id: this.id,
      }
    },

    data: () => ({
      isLoading: false,
    }),

    computed: {
      children: get('documentation/structure'),
      namespace: sync('route/params@namespace'),
      page: sync('route/params@page'),
      structure: sync('documentation/structure'),
      id () {
        if (!this.structure) return ''

        return this.page
      },
      text () {
        if (!this.structure) return ''

        return `${camelCase(this.namespace)}.${camelCase(this.page)}.headingText`
      },
    },

    watch: {
      '$route.path': 'onRouteChange',
    },

    asyncData: load,

    methods: {
      getComponent,
      load,
      onRouteChange () {
        this.load({
          store: this.$store,
          route: this.$route,
        })
      },
    },
  }
</script>

<style lang="sass">
  .page > section
    &:first-child,
    &:last-child
      margin-bottom: 0 !important
</style>
