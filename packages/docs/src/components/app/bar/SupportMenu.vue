<template>
  <app-btn color="medium-emphasis">
    {{ title }}

    <chevron-down />

    <app-menu
      :items="items"
      activator="parent"
      min-width="180"
    />
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
  const title = t('support')
  const items = computed(() => ([
    { subheader: t('professional-support') },
    {
      title: 'direct-support',
      to: {
        name: 'introduction-support',
      },
    },
    { divider: true },
    { subheader: t('community-support') },
    {
      title: 'Discord',
      href: 'https://community.vuetifyjs.com/',
    },
    {
      title: 'github-discussions',
      href: 'https://discussions.vuetifyjs.com/',
    },
    { divider: true },
    { subheader: t('resources-and-tools') },
    {
      title: 'file-a-bug-report',
      href: 'https://issues.vuetifyjs.com/',
    },
    {
      title: 'codepen-template',
      href: 'https://template.vuetifyjs.com/',
    },
    {
      title: 'github-issues',
      href: 'https://github.com/vuetifyjs/vuetify/issues/',
    },
    {
      title: 'documentation-status',
      href: 'https://status.vuetifyjs.com/',
    },
    {
      title: 'stack-overflow',
      href: 'https://stackoverflow.com/search?q=vuetify',
    },
  ]))
</script>
