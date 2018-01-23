<template lang="pug">
  v-container(v-bind="$attrs").page
    app-back-fab(:to="{ name: to }" v-if="to != null && !noBack")
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
        to: state => state.route.from.name || 'getting-started/QuickStart'
      }),
      namespace () {
        const route = this.$route.path.split('/').slice(2)

        return route.map(s => camel(s)).join('.')
      }
    }
  }
</script>
