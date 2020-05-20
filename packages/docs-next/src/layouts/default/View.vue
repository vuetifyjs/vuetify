<template>
  <v-content>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-content>
</template>

<script>
  export default {
    name: 'AppView',
  }
</script>
