<template>
  <v-app>
    <div>
      <Playground />
    </div>
  </v-app>
</template>

<script>
  import Playground from './Playground.vue'

  export default {
    name: 'App',
    components: {
      Playground,
    },
  }
</script>
