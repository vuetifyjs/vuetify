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
      title: 'snips',
      href: 'https://snips.vuetifyjs.com/',
      appendIcon: [
        [
          'M18.3252 15.9618C17.4833 16.375 16.9265 17.0615 16.6685 17.8346L15.0662 15.7153C14.7199 15.2554 14.815 14.609 15.2835 14.2691L15.4328 14.1624L5.47931 1C3.8566 2.18628 3.51712 4.43889 4.71888 6.03171L12.4929 16.3084C12.9614 15.9685 13.62 16.0618 13.9663 16.5217L17.0759 20.6403C18.1147 22.0132 20.0905 22.4398 21.5435 21.4867C23.2884 20.3471 23.5328 17.8812 21.9101 16.4417C20.9392 15.582 19.493 15.3954 18.3252 15.9618ZM20.9392 20.4004C20.0565 21.0469 18.8073 20.8669 18.1487 20.0005C17.4901 19.1342 17.6802 17.9079 18.5628 17.2614C19.4455 16.615 20.6948 16.7949 21.3534 17.6613C22.0119 18.5277 21.8218 19.754 20.9392 20.4004Z', 1,
        ],
        ['M3.08175 16.4865C1.45983 17.9295 1.71879 20.3898 3.47701 21.5202C4.9013 22.4311 6.95255 21.9923 7.96114 20.6491L11.0619 16.5264C11.4094 16.0676 12.0705 15.9679 12.5407 16.307L20.2891 6.01368C21.4885 4.41781 21.1341 2.1703 19.4986 1L9.57624 14.1725L9.72616 14.2789C10.1964 14.6181 10.2986 15.263 9.95105 15.7152L8.34958 17.843C8.0838 17.0717 7.52499 16.3935 6.67996 15.9878C5.501 15.4226 4.04945 15.6221 3.08175 16.4865ZM3.64738 17.6967C4.3016 16.8257 5.55552 16.6395 6.44825 17.2778C7.34099 17.9162 7.5318 19.1397 6.87759 20.0107C6.22337 20.8818 4.96944 21.068 4.07671 20.4297C3.18397 19.7913 2.99316 18.5678 3.64738 17.6967Z', 1],
      ],
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
