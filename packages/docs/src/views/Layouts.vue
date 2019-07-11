<template>
  <component
    :is="component"
    v-if="component !== false"
    :source="`https://github.com/vuetifyjs/vuetify/blob/${branch}/packages/docs/src/examples/layouts/${page}.vue`"
  />
  <not-found v-else />
</template>

<script>
  export default {
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
      const branch = (window) ? window.location.hostname.split('.')[0] : 'master'
      this.branch = ['master', 'dev', 'next'].includes(branch) ? branch : 'master'
    }
  }
</script>
