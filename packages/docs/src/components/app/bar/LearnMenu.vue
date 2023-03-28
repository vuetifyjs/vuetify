<template>
  <app-btn>
    {{ title }}

    <chevron-down />

    <app-menu
      :items="items"
      activator="parent"
      width="200"
    />
  </app-btn>
</template>

<script setup lang="ts">
  // Components
  import ChevronDown from '@/components/icons/ChevronDown.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
  const title = t('learn')
  const items = computed(() => ([
    { subheader: t('documentation') },
    {
      title: t('feature-guides'),
      to: rpath('/introduction/why-vuetify/#feature-guides'),
      appendIcon: 'mdi-lightbulb-on-outline',
    },
    {
      title: t('roadmap'),
      to: rpath('/introduction/roadmap/'),
      appendIcon: 'mdi-compass-outline',
    },
    {
      title: t('components'),
      to: rpath('/components/all/'),
      appendIcon: 'mdi-view-dashboard-outline',
    },
    {
      title: t('labs'),
      to: rpath('/labs/introduction/'),
      appendIcon: 'mdi-beaker-outline',
    },
  ]))
</script>
