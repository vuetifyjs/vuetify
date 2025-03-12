<template>
  <v-system-bar
    app
    flat
    color="#ffb731"
    height="40"
  >
    <v-spacer />

    <div class="text-center">
      <span class="hidden-sm-and-down">Vuetify 2 has reached EOL and is no longer actively maintained.</span> <a href="https://vuetifyjs.com/getting-started/upgrade-guide/" target="_blank">Upgrade to Vuetify 3</a> or learn more about <router-link to="/about/eol">Vuetify 2 EOL</router-link>.
    </div>

    <v-spacer />
  </v-system-bar>
</template>

<script>
  export default {
    name: 'DefaultExploreSystemBar',
  }
</script>
