<template>
  <v-system-bar
    app
    flat
    color="#ffb731"
    height="40"
  >
    <v-spacer />

    <div class="text-center">
      <span class="hidden-sm-and-down">Vuetify 2 has reached EOL and is no longer actively maintained.</span> <a href="https://github.com/vuetifyjs/mcp#upgrade-v2--v3" target="_blank" rel="noopener">Upgrade to Vuetify 3 with Vuetify MCP</a> or learn more about <router-link to="/about/eol">Vuetify 2 EOL</router-link>.
    </div>

    <v-spacer />
  </v-system-bar>
</template>

<script>
  export default {
    name: 'DefaultExploreSystemBar',
  }
</script>
