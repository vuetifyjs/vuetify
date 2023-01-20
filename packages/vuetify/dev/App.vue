<template>
  <v-app>
    <v-main>
      <Playground>
      </Playground>
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
