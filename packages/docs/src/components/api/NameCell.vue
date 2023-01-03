<template>
  <td :id="`${section}-${name.replace('$', '')}`">
    <kbd class="name-item text-mono">
      <app-link
        :href="`#${section}-${name.replace('$', '')}`"
        class="font-weight-bold"
      >
        {{ name }}
      </app-link>
    </kbd>
  </td>
</template>

<script setup>
  defineProps({
    section: String,
    name: String,
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
