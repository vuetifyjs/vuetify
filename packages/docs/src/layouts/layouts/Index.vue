<template>
  <div id="app">
    <component
      :is="component"
      v-if="component"
      :source="`https://github.com/vuetifyjs/vuetify/blob/${branch}/packages/docs/src/examples/layouts/${page}.vue`"
    />
  </div>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { getBranch } from '@/util/helpers'

  export default {
    name: 'LayoutsLayout',

    components: {
      NotFound: () => import('@/pages/general/404'),
    },

    props: {
      page: {
        type: String,
        required: true,
      },
    },

    data: () => ({
      branch: undefined,
      component: undefined,
    }),

    created () {
      const page = kebabCase(this.page)

      import(`./demos/${page}.vue`)
        .then(res => (this.component = res.default))
        .catch(() => {
          console.warn(`Unable to find layout for <${page}>`)

          // this.$router.push({ name: 'Home' })
        })
    },

    mounted () {
      this.branch = getBranch()
    },
  }
</script>
