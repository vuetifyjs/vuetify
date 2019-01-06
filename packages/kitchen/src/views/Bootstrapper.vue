<template>
  <v-content>
    <core-toolbar />

    <component :is="component" />
  </v-content>
</template>

<script>
// Utilities
import {
  mapMutations,
  mapState
} from 'vuex'

export default {
  name: 'Bootstrapper',

  components: {
    CoreToolbar: () => import('@/components/core/Toolbar')
  },

  computed: {
    ...mapState('app', ['component'])
  },

  watch: {
    '$route.params': {
      immediate: true,
      handler: 'load'
    }
  },

  methods: {
    ...mapMutations('app', [
      'setComponent',
      'setRaw'
    ]),
    load (params) {
      const component = params.component

      if (!component) return

      import(`@/pan/${component}`)
        .then(res => this.setComponent(res.default))
        .catch(() => this.$router.push('/'))

      import(`!raw-loader!@/pan/${component}.vue`)
        .then(res => this.setRaw(res.default))
    }
  }
}
</script>
