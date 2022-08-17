<template>
  <app-btn
    color="medium-emphasis"
    variant="text"
  >
    {{ title }}

    <chevron-down />

    <app-menu :items="items" activator="parent" />
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
    name: 'LearnMenu',

    components: { ChevronDown, AppMenu },

    setup () {
      const { t } = useI18n()

      return {
        title: t('learn'),
        items: computed(() => ([
          { heading: t('documentation') },
          {
            title: t('feature-guides'),
            to: {
              name: 'en-introduction-why-vuetify',
              hash: '#feature-guides',
            },
          },
          {
            title: t('roadmap'),
            to: {
              name: 'en-introduction-roadmap',
            },
          },
          { divider: true },
          { heading: t('video-courses') },
          {
            title: 'Vue Mastery',
            href: 'https://vuemastery.com',
          },
          {
            title: 'Vue School',
            href: 'https://vueschool.io?friend=vuetify',
          },
        ])),
      }
    },
  })
</script>
