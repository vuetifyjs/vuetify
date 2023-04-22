<template>
  <app-btn>
    Ecosystem

    <chevron-down />

    <app-menu
      :items="items"
      activator="parent"
      width="200"
    />
  </app-btn>
</template>

<script setup>
  // Components
  import ChevronDown from '@/components/icons/ChevronDown.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
  const items = computed(() => ([
    { subheader: t('social') },
    {
      title: 'Discord',
      href: 'https://community.vuetifyjs.com/',
      appendIcon: 'mdi-discord',
    },
    {
      title: 'github',
      href: 'https://github.com/vuetifyjs/vuetify',
      appendIcon: 'mdi-github',
    },
    {
      title: 'twitter',
      href: 'https://twitter.com/vuetifyjs',
      appendIcon: 'mdi-twitter',
    },
    {
      title: 'reddit',
      href: 'https://reddit.com/r/vuetifyjs',
      appendIcon: 'mdi-reddit',
    },
    { divider: true },
    { subheader: t('tools') },
    {
      title: 'playground',
      href: 'https://play.vuetifyjs.com/',
      appendIcon: 'mdi-play-circle-outline',
    },
    {
      title: 'jobs',
      to: rpath('/resources/jobs-for-vue/'),
      appendIcon: 'mdi-briefcase-variant-outline',
    },
    {
      title: 'themes',
      to: rpath('/resources/themes/'),
      appendIcon: 'mdi-shape-outline',
    },
    {
      title: 'ui-kits',
      to: rpath('/resources/ui-kits/'),
      appendIcon: 'mdi-vector-difference-ab',
    },
    { divider: true },
    { subheader: t('documentation') },
    {
      title: '3.x (latest)',
      href: 'https://vuetifyjs.com/',
      appendIcon: 'mdi-numeric-3-box',
    },
    {
      title: '2.6.x (v2-stable)',
      href: 'https://v2.vuetifyjs.com/',
      appendIcon: 'mdi-numeric-2-box',
    },
    {
      title: '1.5.x (v1-stable)',
      href: 'https://v15.vuetifyjs.com/',
      appendIcon: 'mdi-numeric-1-box',
    },
  ]))
</script>
