<template>
  <v-content>
    <v-fade-transition mode="out-in">
      <router-view :key="$route.path" />
    </v-fade-transition>
  </v-content>
</template>

<script>
  export default {
    name: 'DefaultView',
  }
</script>
