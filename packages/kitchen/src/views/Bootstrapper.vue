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

  created () {
    if (!this.$route.params.component) return

    import(`@/pan/${this.$route.params.component}`)
      .then(res => this.setComponent(res.default))
      .catch(() => this.$router.push('/'))
  },

  methods: {
    ...mapMutations('app', ['setComponent'])
  }
}
</script>
