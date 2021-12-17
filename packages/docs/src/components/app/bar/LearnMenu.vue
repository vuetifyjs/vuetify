<template>
  <app-btn variant="text">
    {{ title }}
    <chevron-down />

    <app-menu :items="items" activator="parent" />
  </app-btn>
</template>

<script lang="ts">
  import { computed, defineComponent } from 'vue'
  import { useI18n } from 'vue-i18n'
  import ChevronDown from '@/components/icons/ChevronDown.vue'
  import AppMenu from '@/components/app/menu/Menu.vue'

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
            title: t('guide'),
            to: {
              // name: 'Documentation',
              // params: {
              //   category: 'introduction',
              //   page: 'why-vuetify',
              // },
              name: 'en-introduction-why-vuetify',
              hash: '#guide',
            },
          },
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
