<template>
  <v-content>
    <v-system-bar
      app
      window
    >
      <strong class="font-weight-black">Cooking:&nbsp;</strong>{{ cooking }} 🔥
    </v-system-bar>
    <component :is="component" />
  </v-content>
</template>

<script>
export default {
  name: 'Bootstrapper',

  data: () => ({
    component: null,
    cooking: null
  }),

  created () {
    if (!this.$route.params.component) return

    import(`@/pan/${this.$route.params.component}`)
      .then(res => {
        this.component = res.default
        this.cooking = this.component.name
      })
      .catch(() => this.$router.push('/'))
  }
}
</script>
