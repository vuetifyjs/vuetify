<template>
  <component
    :is="component"
    v-if="component !== false"
    :source="`https://github.com/vuetifyjs/vuetify/blob/${branch}/packages/docs/src/examples/layouts/${page}.vue`"
  />
  <not-found v-else />
</template>

<script>
  import { getBranch } from '@/util/helpers'

  export default {
    name: 'Layouts',

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
      import(`@/examples/layouts/${this.page}.vue`)
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
