<template>
  <AppBtn
    :text="t('enterprise')"
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    color="primary"
    variant="outlined"
    @click="gtagClick('app-bar', 'enterprise', name)"
  />
</template>

<script setup>
  const { t } = useI18n()
  const { name } = useRoute()
</script>
