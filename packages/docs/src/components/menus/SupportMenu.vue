<template>
  <app-menu :items="items">
    <template #activator="{ attrs, on }">
      <app-btn
        v-bind="attrs"
        v-on="on"
      >
        {{ $t('support') }}

        <app-chevron-down />
      </app-btn>
    </template>
  </app-menu>
</template>

<script>
  export default {
    name: 'SupportMenu',

    computed: {
      items () {
        return [
          { heading: this.$t('professional-support') },
          {
            title: this.$t('consulting'),
            to: {
              name: 'Documentation',
              params: {
                category: 'professional-support',
                page: 'consulting',
              },
            },
          },
          {
            title: this.$t('enterprise'),
            to: {
              name: 'Documentation',
              params: {
                category: 'professional-support',
                page: 'enterprise',
              },
            },
          },
          { divider: true },
          { heading: this.$t('community-support') },
          {
            title: this.$t('discord'),
            href: 'https://community.vuetifyjs.com/',
          },
          {
            title: this.$t('github-discussions'),
            href: 'https://discussions.vuetifyjs.com/',
          },
          { divider: true },
          { heading: this.$t('resources-and-tools') },
          {
            title: this.$t('file-a-bug-report'),
            href: 'https://issues.vuetifyjs.com/',
          },
          {
            title: this.$t('codepen-template'),
            href: 'https://template.vuetifyjs.com/',
          },
          {
            title: this.$t('github-issues'),
            href: 'https://github.com/vuetifyjs/vuetify/issues/',
          },
          {
            title: this.$t('documentation-status'),
            href: 'https://status.vuetifyjs.com/',
          },
          {
            title: this.$t('stack-overflow'),
            href: 'https://stackoverflow.com/search?q=vuetify',
          },
        ]
      },
    },
  }
</script>
