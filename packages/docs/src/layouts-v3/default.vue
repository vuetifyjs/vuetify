<template>
  <div class="px-4 py-10 text-center">
    <router-view />
    <div class="mt-5 mx-auto text-center">
      [Default Layout]
    </div>
  </div>
</template>

<script lang="ts">
// Utilities
  import { defineComponent } from 'vue'

  export default defineComponent({
    name: 'DefaultLayout',

  })
</script>
