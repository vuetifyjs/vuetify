<template lang="pug">
  v-container.page
    app-back-fab(:to="to" v-if="to")
    slot(:namespace="namespace")
</template>


<script>
  import { camel } from '@/util/helpers'

  export default {
    props: {
      to: String
    },

    computed: {
      namespace () {
        const route = this.$route.path.slice(1).split('/')

        return route.map(s => camel(s)).join('.')
      }
    }
  }
</script>
