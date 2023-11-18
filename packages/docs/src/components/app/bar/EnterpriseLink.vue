<template>
  <app-btn
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    @click="gtagClick('app-bar', 'enterprise', name)"
  >

    {{ t('enterprise') }}
  </app-btn>
</template>

<script setup>
  // Composables
  import { useI18n } from 'vue-i18n'
  import { useRoute } from 'vue-router'

  // Utilities
  import { rpath } from '@/util/routes'
  import { gtagClick } from '@/util/analytics'

  const { t } = useI18n()
  const { name } = useRoute()
</script>
