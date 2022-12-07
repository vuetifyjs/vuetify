<template>
  <app-btn color="medium-emphasis">
    {{ title }}

    <chevron-down />

    <app-menu :items="items" activator="parent" />
  </app-btn>
</template>

<script setup lang="ts">
  // Components
  import ChevronDown from '@/components/icons/ChevronDown.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'

  const { t } = useI18n()
  const title = t('learn')
  const items = computed(() => ([
    { subheader: t('documentation') },
    {
      title: t('feature-guides'),
      to: {
        name: 'introduction-why-vuetify',
        hash: '#feature-guides',
      },
    },
    {
      title: t('roadmap'),
      to: {
        name: 'introduction-roadmap',
      },
    },
    {
      title: t('components'),
      to: {
        name: 'components-all',
      },
    },
  ]))
</script>
