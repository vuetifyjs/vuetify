<template>
  <app-btn
    color="medium-emphasis"
    class="ms-1"
  >
    {{ title }}

    <chevron-down />

    <app-menu
      :items="items"
      activator="parent"
      width="220"
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
  const title = t('support')
  const items = computed(() => ([
    { subheader: t('help-and-support') },
    {
      title: 'for-enterprise',
      to: rpath('/introduction/enterprise-support/'),
      appendIcon: 'mdi-shield-star-outline',
    },
    {
      title: 'file-a-bug-report',
      href: 'https://issues.vuetifyjs.com/',
      appendIcon: 'mdi-spider',
    },
    {
      title: 'github-discussions',
      href: 'https://github.com/vuetifyjs/vuetify/discussions',
      appendIcon: 'mdi-message-text',
    },
    { divider: true },
    { subheader: t('resources') },
    {
      title: 'upgrade-guide',
      to: rpath('/getting-started/upgrade-guide/'),
      appendIcon: 'mdi-update',
    },
    {
      title: 'github-issues',
      href: 'https://github.com/vuetifyjs/vuetify/issues/',
      appendIcon: 'mdi-alert-circle-outline',
    },
    {
      title: 'codepen-template',
      href: 'https://template.vuetifyjs.com/',
      appendIcon: 'mdi-codepen',
    },
    {
      title: 'documentation-status',
      href: 'https://status.vuetifyjs.com/',
      appendIcon: 'mdi-server',
    },
    {
      title: 'stack-overflow',
      href: 'https://stackoverflow.com/search?q=vuetify',
      appendIcon: 'mdi-stack-overflow',
    },
    {
      title: 'latest-releases',
      href: 'https://github.com/vuetifyjs/vuetify/releases',
      appendIcon: 'mdi-package-variant',
    },
  ]))
</script>
