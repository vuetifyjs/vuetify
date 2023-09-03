<template>
  <td :id="`${section}-${name.replace('$', '')}`">
    <kbd class="name-item text-mono">
      <app-link :href="href" class="font-weight-bold">
        {{ name }}
      </app-link>
    </kbd>
  </td>
</template>

<script setup>
  import { computed } from 'vue'

  const props = defineProps({
    section: String,
    name: String,
  })

  const href = computed(() => {
    return `#${props.section}-${props.name.replace('$', '')}`
  })
</script>

<style scoped>
  .app-link {
    margin-left: -14px;
  }

  .app-link :deep(.v-icon) {
    opacity: 0;
    margin: 0;
  }

  .app-link:hover :deep(.v-icon) {
    opacity: 1;
  }
</style>
