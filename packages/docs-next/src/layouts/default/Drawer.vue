<template>
  <v-navigation-drawer app>
    <v-list
      dense
      nav
    >
      <v-list-group
        v-for="item in items"
        :key="item.title"
        :group="genGroup(item.group)"
        :prepend-icon="item.icon"
        no-action
      >
        <template v-slot:activator>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </template>

        <v-list-item
          v-for="page in pages[item.group]"
          :key="page.title"
          :to="`/${locale}${page.to}`"
        >
          <v-list-item-content>
            <v-list-item-title v-text="page.title" />
          </v-list-item-content>
        </v-list-item>
      </v-list-group>
    </v-list>
  </v-navigation-drawer>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'DefaultDrawer',

    computed: {
      locale: get('route/params@locale'),
      pages: get('app/pages'),
      items () {
        return [
          {
            title: this.$t('getting-started'),
            icon: '$mdiSpeedometer',
            group: 'getting-started',
          },
          {
            title: this.$t('components'),
            icon: '$mdiViewDashboard',
            group: 'components',
          },
          {
            title: this.$t('api'),
            icon: '$mdiBeaker',
            group: 'api',
          },
        ]
      },
    },

    methods: {
      genGroup (group) {
        return this.pages[group].reduce((group, { to }) => {
          // Pages are expected to have a leading slash
          const path = to.split('/').slice(1).join('/')

          if (!group.includes(path)) group.push(path)

          return group
        }, []).join('|')
      },
    },
  }
</script>
