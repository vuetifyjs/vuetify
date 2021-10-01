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

  export default defineComponent({
    name: 'SupportMenu',

    setup () {
      const { t } = useI18n()

      return {
        title: t('support'),
        items: computed(() => ([
          { heading: t('professional-support') },
          {
            title: t('direct-support'),
            // to: {
            //   name: 'Documentation',
            //   params: {
            //     category: 'introduction',
            //     page: 'support',
            //   },
            // },
          },
          {
            title: t('enterprise'),
            // to: {
            //   name: 'Documentation',
            //   params: {
            //     category: 'introduction',
            //     page: 'enterprise',
            //   },
            // },
          },
          { divider: true },
          { heading: t('community-support') },
          {
            title: 'Discord',
            href: 'https://community.vuetifyjs.com/',
          },
          {
            title: t('github-discussions'),
            href: 'https://discussions.vuetifyjs.com/',
          },
          { divider: true },
          { heading: t('resources-and-tools') },
          {
            title: t('file-a-bug-report'),
            href: 'https://issues.vuetifyjs.com/',
          },
          {
            title: t('codepen-template'),
            href: 'https://template.vuetifyjs.com/',
          },
          {
            title: t('github-issues'),
            href: 'https://github.com/vuetifyjs/vuetify/issues/',
          },
          {
            title: t('documentation-status'),
            href: 'https://status.vuetifyjs.com/',
          },
          {
            title: t('stack-overflow'),
            href: 'https://stackoverflow.com/search?q=vuetify',
          },
        ])),
      }
    },
  })
</script>
