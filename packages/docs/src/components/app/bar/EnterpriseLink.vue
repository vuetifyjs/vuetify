<template>
  <AppBtn
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    @click="gtagClick('app-bar', 'enterprise', name)"
  >

    {{ t('enterprise') }}
  </AppBtn>
</template>

<script setup>
  const { t } = useI18n()
  const { name } = useRoute()
</script>
