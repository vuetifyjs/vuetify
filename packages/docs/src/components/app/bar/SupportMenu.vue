<template>
  <app-btn variant="text">
    {{ title }}
    <chevron-down />

    <app-menu
      min-width="180"
      activator="parent"
      :items="items"
    />
  </app-btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import ChevronDown from '@/components/icons/ChevronDown.vue'
  import AppMenu from '@/components/app/menu/Menu.vue'

  export default defineComponent({
    name: 'SupportMenu',

    components: { ChevronDown, AppMenu },

    setup () {
      const { t } = useI18n()

      return {
        title: t('support'),
        items: computed(() => ([
          // { heading: t('professional-support') },
          {
            title: 'direct-support',
            // to: {
            //   name: 'Documentation',
            //   params: {
            //     category: 'introduction',
            //     page: 'support',
            //   },
            // },
          },
          {
            title: 'enterprise',
            // to: {
            //   name: 'Documentation',
            //   params: {
            //     category: 'introduction',
            //     page: 'enterprise',
            //   },
            // },
          },
          // { divider: true },
          // { heading: t('community-support') },
          {
            title: 'Discord',
            href: 'https://community.vuetifyjs.com/',
          },
          {
            title: 'github-discussions',
            href: 'https://discussions.vuetifyjs.com/',
          },
          // { divider: true },
          // { heading: t('resources-and-tools') },
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
