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
  import { getComponent } from '@/util/helpers'
  import {
    get,
    sync,
  } from 'vuex-pathify'
  import {
    camelCase,
    kebabCase,
    upperFirst,
  } from 'lodash'

  async function load ({ route, store }) {
    const namespace = kebabCase(route.params.namespace)
    const page = upperFirst(camelCase(route.params.page))
    const setStructure = structure => store.commit('documentation/SET_STRUCTURE', structure)

    setStructure(null)

    await new Promise(resolve => setTimeout(resolve, 0))

    this.isLoading = true

    try {
      const res = await import(
        /* webpackChunkName: "documentation-pages" */
        `@/data/pages/${namespace}/${page}`
      )

      setStructure(res.default)
    } catch (err) {
      setStructure(false)
    }

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
      return { id: this.id }
    },

    data: () => ({ isLoading: false }),

    computed: {
      ...sync('route@params', ['namespace', 'page']),
      children: get('documentation/structure'),
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

    watch: { '$route.path': 'onRouteChange' },

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
