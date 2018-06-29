<template lang="pug">
  v-container(v-bind="$attrs").page
    app-back-fab(:to="to" v-if="to != null && !noBack")
    slot(:namespace="namespace")
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import { camel } from '@/util/helpers'

  export default {
    inheritAttrs: false,

    props: {
      noBack: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      ...mapState({
        to: state => {
          if (!state.route.from) {
            return {
              name: 'getting-started/QuickStart'
            }
          }

          return {
            name: state.route.from.name,
            params: state.route.from.params
          }
        }
      }),
      namespace () {
        const route = this.$route.path.split('/').slice(2)

        return route.map(s => camel(s)).join('.')
      }
    }
  }
</script>
