<template>
  <app-btn
    class="ml-8"
    color="medium-emphasis"
  >
    <span class="text-none">
      v{{ title }}
    </span>

    <chevron-down />

    <app-menu
      :items="items"
      activator="parent"
      min-width="180"
    />
  </app-btn>
</template>

<script setup>
  // Components
  import ChevronDown from '@/components/icons/ChevronDown.vue'
  import { version } from 'vuetify'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed } from 'vue'
  import { rpath } from '@/util/routes'

  const { t } = useI18n()
  const title = version
  const items = computed(() => ([
    { subheader: t('documentation') },
    {
      title: '3.0.x (next)',
      href: 'https://v3.vuetifyjs.com/',
    },
    {
      title: '2.6.x (latest)',
      href: 'https://vuetifyjs.com/',
    },
    {
      title: '1.5.x (stable)',
      href: 'https://v15.vuetifyjs.com/',
    },
    { divider: true },
    { subheader: t('releases') },
    {
      title: 'release-notes',
      to: rpath('/getting-started/release-notes/'),
    },
    {
      title: 'github-releases',
      href: 'https://github.com/vuetifyjs/vuetify/releases',
    },
  ]))
</script>
