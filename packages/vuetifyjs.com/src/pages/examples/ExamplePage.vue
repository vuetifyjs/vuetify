<template lang="pug">
  component(:is="component" :source="source")
</template>

<script>
  import { camel } from '@/util/helpers'
  import NotFound from '@/pages/general/404Page'

  export default {
    data: () => ({
      component: null
    }),

    computed: {
      source () {
        const path = this.$route.path.split('/').slice(2).join('/')
        return `https://github.com/vuetifyjs/vuetify/blob/master/packages/vuetifyjs.com/src/${path}.vue`
      }
    },

    beforeRouteEnter (to, from, next) {
      let example = camel(to.params.example)
      example = `${example.substr(0, 1).toLowerCase()}${example.slice(1)}`

      return import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../../examples/${example}.vue`
      ).catch(e => NotFound).then(comp => {
        next(vm => { vm.component = comp.default })
      })
    }
  }
</script>
