<template>
  <div>
    <span class="font-weight-bold me-1 text-medium-emphasis">
      {{ t('edit-this-page') }}
    </span>
    <AppLink :href="href">
      {{ t('github') }}
    </AppLink>
  </div>
</template>

<script setup>
  const { t } = useI18n()
  const route = useRoute()

  const href = computed(() => {
    const branch = getBranch()
    const link = route.path.split('/').slice(2).filter(v => v).join('/')

    return `https://github.com/vuetifyjs/vuetify/tree/${branch}/packages/docs/src/pages/en/${link}.md`
  })
</script>
