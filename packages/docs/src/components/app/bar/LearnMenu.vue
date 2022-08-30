<template>
  <app-btn color="medium-emphasis">
    {{ title }}

    <chevron-down />

    <app-menu :items="items" activator="parent" />
  </app-btn>
</template>

<script lang="ts" setup>
  // Components
  import AppMenu from '@/components/app/menu/Menu.vue'
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
    { divider: true },
    { subheader: t('video-courses') },
    {
      title: 'Vue Mastery',
      href: 'https://vuemastery.com',
    },
    {
      title: 'Vue School',
      href: 'https://vueschool.io?friend=vuetify',
    },
  ]))
</script>
