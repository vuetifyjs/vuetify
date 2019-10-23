<template>
  <div id="app">
    <component
      :is="component"
      v-if="component !== false"
      :source="`https://github.com/vuetifyjs/vuetify/blob/${branch}/packages/docs/src/examples/layouts/${page}.vue`"
    />

    <not-found v-else />
  </div>
</template>

<script>
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
      import(`./demos/${this.page}.vue`)
        .then(res => (this.component = res.default))
        .catch(() => {
          this.component = false
          throw new Error(`Unable to find layout for <${this.page}>`)
        })
    },

    mounted () {
      this.branch = getBranch()
    },
  }
</script>
