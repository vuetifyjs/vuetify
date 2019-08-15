<template>
  <v-content>
    <component :is="component" />
  </v-content>
</template>

<script>
  import { mapMutations, mapState } from 'vuex'

  export default {
    name: 'Bootstrapper',

    computed: {
      ...mapState('app', ['component']),
    },

    watch: {
      '$route.params': {
        immediate: true,
        handler: 'load',
      },
    },

    methods: {
      ...mapMutations('app', [
        'setComponent',
        'setRaw',
      ]),
      load (params) {
        const component = params.component

        if (!component) return

        import(`@/pan/${component}`)
          .then(res => this.setComponent(res.default))
          .catch(() => this.$router.push('/'))

        import(`!raw-loader!@/pan/${component}.vue`)
          .then(res => this.setRaw(res.default))
      },
    },
  }
</script>
