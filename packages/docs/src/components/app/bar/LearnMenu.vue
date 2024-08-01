<template>
  <AppBtn>
    {{ title }}

    <IconsChevronDown />

    <AppMenuMenu
      :items="items"
      activator="parent"
      width="200"
    />
  </AppBtn>
</template>

<script setup lang="ts">
  const { t } = useI18n()
  const title = t('learn')
  const items = computed(() => ([
    { subheader: t('overview') },
    {
      title: t('api-explorer'),
      to: rpath('/components/explorer/'),
      appendIcon: 'i-mdi:code-json',
    },
    {
      title: t('colors'),
      to: rpath('/styles/colors/#material-colors'),
      appendIcon: 'i-mdi:palette-swatch-outline',
    },
    {
      title: t('components'),
      to: rpath('/components/all/'),
      appendIcon: 'i-mdi:view-dashboard-outline',
    },
    {
      title: t('feature-guides'),
      to: rpath('/introduction/why-vuetify/#feature-guides'),
      appendIcon: 'i-mdi:lightbulb-on-outline',
    },
    {
      title: t('icons'),
      to: rpath('/features/icon-fonts/#mdi-icon-search'),
      appendIcon: 'i-mdi:emoticon-outline',
    },
    {
      title: t('labs'),
      to: rpath('/labs/introduction/'),
      appendIcon: 'i-mdi:beaker-outline',
    },
    {
      title: t('licensing'),
      to: rpath('/about/licensing/'),
      appendIcon: 'i-mdi:file-document-outline',
    },
    {
      title: t('roadmap'),
      to: rpath('/introduction/roadmap/'),
      appendIcon: 'i-mdi:compass-outline',
    },
    {
      title: t('sass-variables'),
      to: rpath('/features/sass-variables/#variable-api'),
      appendIcon: 'i-mdi:sass',
    },
    {
      title: t('unit-testing'),
      to: rpath('/getting-started/unit-testing/'),
      appendIcon: 'i-mdi:list-status',
    },
    { divider: true },
    { subheader: t('documentation') },
    {
      title: '3.x (latest)',
      href: 'https://vuetifyjs.com/',
      appendIcon: 'i-mdi:numeric-3-box',
    },
    {
      title: '2.6.x (v2-stable)',
      href: 'https://v2.vuetifyjs.com/',
      appendIcon: 'i-mdi:numeric-2-box',
    },
    {
      title: '1.5.x (v1-stable)',
      href: 'https://v15.vuetifyjs.com/',
      appendIcon: 'i-mdi:numeric-1-box',
    },
  ]))
</script>
