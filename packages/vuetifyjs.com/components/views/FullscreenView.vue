<template lang="pug">
  v-container(v-bind="$attrs").page
    app-back-fab(:to="to" v-if="to && !noBack")
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

    data: () => ({
      to: null
    }),

    computed: {
      ...mapState({
        from: state => state.route.from
      }),
      namespace () {
        const route = this.$route.path.slice(1).split('/')

        return route.map(s => camel(s)).join('.')
      }
    },

    mounted () {
      this.to = this.from
      this.$store.commit('app/FULLSCREEN', true)
    },

    beforeDestroy () {
      this.$store.commit('app/FULLSCREEN', false)
    }
  }
</script>
