<template>
  <v-app :dark="$vuetify.dark">
    <v-toolbar
      color="blue-grey"
      dark
      fixed
      app
      clipped-right
    >
      <v-toolbar-side-icon @click.stop="drawer = !drawer"/>
      <v-toolbar-title>Vuetify kitchen</v-toolbar-title>
      <v-spacer />
      <codepen />
      <v-btn
        icon
        @click="$vuetify.dark = !$vuetify.dark"
      >
        <v-icon title="Change theme">
          mdi-invert-colors
        </v-icon>
      </v-btn>
      <v-btn
        v-if="$route.params.component"
        :href="href"
        target="_blank"
        rel="noopener"
        icon
        title="Edit this page on Github"
      >
        <v-icon>mdi-pencil</v-icon>
      </v-btn>
    </v-toolbar>
    <v-navigation-drawer
      v-model="drawer"
      app
      fixed>
      <v-list
        dense
        class="pt-0">
        <v-list-tile
          v-for="item in items"
          :key="item.title"
          :to="item.to"
        >
          <v-list-tile-content>
            <v-list-tile-title>{{ item.title }}</v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
    <router-view />
  </v-app>
</template>

<script>
import meals from './pan'

const items = meals.map(meal => ({ title: meal, to: meal }))

export default {
  components: {
    Codepen: () => import('@/components/Codepen')
  },
  filters: {
    capitalize (value) {
      if (!value) return ''
      value = value.toString()
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data: () => ({
    items: [
      { title: 'Home', to: '/' },
      ...items
    ],
    drawer: false
  }),
  computed: {
    href () {
      return `https://github.com/vuetifyjs/vuetify/tree/master/packages/kitchen/src/pan/${this.$route.params.component}.vue`
    }
  }
}
</script>
