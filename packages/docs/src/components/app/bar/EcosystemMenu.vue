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
    { subheader: t('tools') },
    {
      title: 'vuetify-one',
      to: rpath('/one/'),
      appendIcon: '$vuetify-outline',
    },
    {
      title: 'vuetify-play',
      href: 'https://play.vuetifyjs.com/',
      appendIcon: '$vuetify-play',
    },
    {
      title: 'vuetify-bin',
      href: 'https://bin.vuetifyjs.com/',
      appendIcon: '$vuetify-bin',
    },
    {
      title: 'vuetify-create',
      href: 'https://github.com/vuetifyjs/create/',
      appendIcon: '$vuetify-create',
    },
    {
      title: 'vuetify-link',
      href: 'https://link.vuetifyjs.com/',
      appendIcon: '$vuetify-link',
    },
    {
      title: 'vuetify-studio',
      href: 'https://studio.vuetifyjs.com/',
      appendIcon: '$vuetify-studio',
    },
    {
      title: 'vuetify-snips',
      href: 'https://snips.vuetifyjs.com/',
      appendIcon: '$vuetify-snips',
    },
    {
      title: 'vuetify-mcp',
      href: 'https://mcp.vuetifyjs.com/',
      appendIcon: '$vuetify-mcp',
    },
    {
      title: 'vuetify-store',
      href: 'https://store.vuetifyjs.com/',
      appendIcon: '$vuetify-store',
    },
    {
      title: 'vuetify-figma',
      href: 'https://store.vuetifyjs.com/products/vuetify-ui-kit-figma',
      appendIcon: '$vuetify-figma',
    },
    { divider: true },
    { subheader: t('social') },
    {
      title: 'Blog',
      to: rpath('/blog'),
      appendIcon: 'mdi-post-outline',
    },
    {
      title: 'X',
      href: 'https://x.com/vuetifyjs',
      appendIcon: '$x',
    },
    {
      title: 'bluesky',
      href: 'https://bsky.app/profile/vuetify.bsky.social',
      appendIcon: 'mdi-bluesky',
    },
    {
      title: 'Discord',
      href: 'https://community.vuetifyjs.com/',
      appendIcon: '$discord',
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
  ]))
</script>
