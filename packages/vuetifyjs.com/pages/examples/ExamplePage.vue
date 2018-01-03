<template lang="pug">
  component(:is="component" :source="source")
</template>

<script>
  import { camel } from '@/util/helpers'

  export default {
    data: () => ({
      component: null
    }),

    computed: {
      source () {
        const path = this.$route.fullPath
        return `https://github.com/vuetifyjs/vuetifyjs.com/blob/master${path}.vue`
      }
    },

    beforeRouteEnter (to, from, next) {
      let example = camel(to.params.example)
      example = `${example.substr(0, 1).toLowerCase()}${example.slice(1)}`

      return import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../../examples/${example}.vue`
      ).then(comp => {
        next(vm => vm.component = comp.default)
      }).catch(e => {
        next('/404')
      })
    }
  }
</script>
