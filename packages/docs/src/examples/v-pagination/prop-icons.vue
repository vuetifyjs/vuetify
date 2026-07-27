<template>
  <div class="text-center">
    <v-pagination
      v-model="page"
      :length="4"
      next-icon="mdi-menu-right"
      prev-icon="mdi-menu-left"
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
