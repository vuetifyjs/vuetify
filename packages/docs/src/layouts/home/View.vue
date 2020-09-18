<template>
  <v-main>
    <v-container class="px-4 text-center font-weight-light">
      <v-fade-transition mode="out-in">
        <router-view />
      </v-fade-transition>
    </v-container>
  </v-main>
</template>

<script>
  export default {
    name: 'HomeView',
  }
</script>
