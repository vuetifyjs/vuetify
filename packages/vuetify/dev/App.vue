<template>
  <v-app>
    <v-main>
      <Month>
      </Month>
    </v-main>
  </v-app>
</template>

<script>
  import Playground from './Playground'
  import Month from "./Month";

  export default {
    components: {
      Playground,
      Month
    },
  }
</script>
