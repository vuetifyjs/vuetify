<template>
  <v-main>
    <keep-alive>
      <router-view
        :key="$route.path"
        :name="name"
      />
    </keep-alive>
  </v-main>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DocumentationView',

    computed: {
      category: get('route/params@category'),
      name () {
        return this.category === 'api'
          ? 'api'
          : 'default'
      },
    },
  }
</script>
