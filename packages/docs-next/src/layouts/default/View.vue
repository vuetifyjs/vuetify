<template>
  <v-main>
    <router-view :key="$route.path" />
  </v-main>
</template>

<script>
  export default {
    name: 'DefaultView',
  }
</script>
