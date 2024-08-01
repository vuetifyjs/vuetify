<template>
  <AppBtn
    class="ms-1"
    color="medium-emphasis"
  >
    {{ title }}

    <IconsChevronDown />

    <AppMenuMenu
      :items="items"
      activator="parent"
      width="220"
    />
  </AppBtn>
</template>

<script setup>
  const { t } = useI18n()
  const title = t('support')
  const items = computed(() => ([
    { subheader: t('help-and-support') },
    {
      title: 'for-enterprise',
      to: rpath('/introduction/enterprise-support/'),
      appendIcon: 'i-mdi:shield-star-outline',
    },
    {
      title: 'file-a-bug-report',
      href: 'https://issues.vuetifyjs.com/',
      appendIcon: 'i-mdi:bug-outline',
    },
    {
      title: 'faq',
      to: rpath('/getting-started/frequently-asked-questions/'),
      appendIcon: 'i-mdi:head-question-outline',
    },
    {
      title: 'upgrade-guide',
      to: rpath('/getting-started/upgrade-guide/'),
      appendIcon: 'i-mdi:update',
    },
    {
      title: 'github-discussions',
      href: 'https://github.com/vuetifyjs/vuetify/discussions',
      appendIcon: 'i-mdi:message-text-outline',
    },
    {
      title: 'stack-overflow',
      href: 'https://stackoverflow.com/search?q=vuetify',
      appendIcon: 'i-mdi:layers-outline',
    },
    { divider: true },
    { subheader: t('resources') },
    {
      title: 'github-issues',
      href: 'https://github.com/vuetifyjs/vuetify/issues/',
      appendIcon: 'i-mdi:alert-circle-outline',
    },
    {
      title: 'documentation-status',
      href: 'https://status.vuetifyjs.com/',
      appendIcon: 'i-mdi:cloud-outline',
    },
    {
      title: 'latest-releases',
      href: 'https://github.com/vuetifyjs/vuetify/releases',
      appendIcon: 'i-mdi:package-variant',
    },
  ]))
</script>
