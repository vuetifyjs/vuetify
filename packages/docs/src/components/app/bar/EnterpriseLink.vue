<template>
  <app-btn
    :to="rpath('/introduction/enterprise-support/')"
    class="ms-1"
    color="medium-emphasis"
    variant="text"
    @click="gtagClick('app-bar', 'enterprise', name)"
  >

    {{ t('enterprise') }}

    <!-- <v-badge
      class="ms-n1 mb-4"
      color="success"
      dot
      inline
    /> -->
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
