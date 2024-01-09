<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      prev-icon="mdi-menu-left"
      next-icon="mdi-menu-right"
    ></v-pagination>
  </div>
</template>

<script setup>
  import { ref } from 'vue'

  const page = ref(1)
</script>

<script>
  export default {
    data () {
      return {
        page: 1,
      }
    },
  }
</script>
