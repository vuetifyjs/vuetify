<template>
  <td :id="`${section}-${name.replace('$', '')}`">
    <div class="d-inline-flex align-center">
      <kbd class="name-item text-mono">
        <AppLink :href="href" class="font-weight-bold">
          {{ name }}
        </AppLink>
      </kbd>

      <new-in-chip
        v-if="newIn"
        :text="t('new-in', { version: newIn })"
        :to="to"
      />
    </div>
  </td>
</template>

<script setup>
  const props = defineProps({
    section: String,
    name: String,
    newIn: String,
  })

  const { t } = useI18n()

  const href = computed(() => {
    return `#${props.section}-${props.name.replace('$', '')}`
  })
  const to = computed(() => {
    return rpath(`/getting-started/release-notes/?version=v${props.newIn}`)
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
