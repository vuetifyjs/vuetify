<template>
  <v-main>
    <v-container class="px-4 text-center font-weight-light">
      <router-view v-slot="{ Component }">
        <v-fade-transition mode="out-in">
          <component :is="Component" />
        </v-fade-transition>
      </router-view>
    </v-container>
  </v-main>
</template>

<script lang="ts">
  // Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'HomeView',

  })
</script>
