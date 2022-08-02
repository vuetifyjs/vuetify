<template>
  <app-btn>
    {{ title }}

    <chevron-down />

    <app-menu
      :items="items"
      activator="parent"
      min-width="180"
    />
  </app-btn>
</template>

<script lang="ts">
  // Components
  import AppMenu from '@/components/app/menu/Menu.vue'
  import ChevronDown from '@/components/icons/ChevronDown.vue'

  // Composables
  import { useI18n } from 'vue-i18n'

  // Utilities
  import { computed, defineComponent } from 'vue'

  export default defineComponent({
    name: 'SupportMenu',

    components: { ChevronDown, AppMenu },

    setup () {
      const { t } = useI18n()

      return {
        title: t('support'),
        items: computed(() => ([
          // {
          //   title: 'direct-support',
          //   to: {
          //     name: 'Documentation',
          //     params: {
          //       category: 'introduction',
          //       page: 'support',
          //     },
          //   },
          // },
          // {
          //   title: 'enterprise',
          //   to: {
          //     name: 'Documentation',
          //     params: {
          //       category: 'introduction',
          //       page: 'enterprise',
          //     },
          //   },
          // },
          // { divider: true },
          { heading: t('community-support') },
          {
            title: 'Discord',
            href: 'https://community.vuetifyjs.com/',
          },
          {
            title: 'github-discussions',
            href: 'https://discussions.vuetifyjs.com/',
          },
          { divider: true },
          { heading: t('resources-and-tools') },
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
        ])),
      }
    },
  })
</script>
