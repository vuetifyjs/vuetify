<template>
  <v-main>
    <v-fade-transition mode="out-in">
      <router-view />
    </v-fade-transition>
  </v-main>
</template>

<script>
  export default {
    name: 'DefaultView',
  }
</script>
