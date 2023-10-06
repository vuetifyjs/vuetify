<template>
  <div>
    <v-list-item
      :prepend-icon="icon"
      @click="onClick"
    />
  </div>
</template>

<script setup>
  // Stores
  import { useUserStore } from '@/store/user'

  // Utilities
  import { computed } from 'vue'

  const user = useUserStore()

  const icon = computed(() => {
    return user.railDrawer ? 'mdi-chevron-double-right' : 'mdi-chevron-double-left'
  })

  function onClick () {
    user.railDrawer = !user.railDrawer
  }
</script>
