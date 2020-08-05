<template>
  <app-menu :items="items">
    <template #activator="{ attrs, on }">
      <app-btn
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('learn') }}

        <app-chevron-down />
      </app-btn>
    </template>
  </app-menu>
</template>

<script>
  export default {
    name: 'LearnMenu',

    computed: {
      items () {
        return [
          { heading: 'documentation' },
          {
            title: this.$t('guide'),
            to: {
              name: 'Documentation',
              params: {
                category: 'beginners-guide',
                page: 'guide',
              },
            },
          },
          { divider: true },
          { heading: this.$t('video-courses') },
          {
            title: 'Vue Mastery',
            href: 'https://vuemastery.com',
          },
          {
            title: 'Vue School',
            href: 'https://vueschool.io?friend=vuetify',
          },
        ]
      },
    },
  }
</script>
