<template>
  <AppBtn>
    Ecosystem

    <IconsChevronDown />

    <AppMenuMenu
      :items="items"
      activator="parent"
      width="200"
    />
  </AppBtn>
</template>

<script setup>
  const { t } = useI18n()
  const items = computed(() => ([
    { subheader: t('social') },
    {
      title: 'X',
      href: 'https://x.com/vuetifyjs',
      appendIcon: '$x',
    },
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
      title: 'reddit',
      href: 'https://reddit.com/r/vuetifyjs',
      appendIcon: 'mdi-reddit',
    },
    { divider: true },
    { subheader: t('tools') },
    {
      title: 'awesome',
      href: 'https://github.com/vuetifyjs/awesome-vuetify',
      appendIcon: 'mdi-creation-outline',
    },
    {
      title: 'brand-kit',
      to: rpath('/resources/brand-kit/'),
      appendIcon: '$vuetify-outline',
    },
    {
      title: 'create',
      href: 'https://tryvuetify.com/',
      appendIcon: 'mdi-widgets-outline',
    },
    {
      title: 'pastebin',
      href: 'https://bin.vuetifyjs.com/',
      appendIcon: 'mdi-delete-outline',
    },
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
  ]))
</script>
