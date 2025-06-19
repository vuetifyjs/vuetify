<template>
  <td :id="`${section}-${name.replace('$', '')}`">
    <div class="d-inline-flex align-center">
      <kbd class="name-item">
        <AppLink :href="href" class="font-weight-bold text-body-2">
          {{ name }}
        </AppLink>
      </kbd>

      <v-tooltip v-if="newIn" interactive>
        <template #activator="{ props: tooltipProps }">
          <v-icon
            v-bind="tooltipProps"
            class="ms-1 cursor-pointer"
            color="success"
            icon="mdi-new-box"
          />
        </template>
        <RouterLink :to="to" class="text-white text-decoration-none d-inline-flex align-center">
          <span>Added on v{{ newIn }}</span>
          <v-icon class="ms-1" icon="mdi-page-next" size="small" />
        </RouterLink>
      </v-tooltip>
    </div>
  </td>
</template>

<script setup>
  const props = defineProps({
    section: String,
    name: String,
    newIn: String,
  })

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
