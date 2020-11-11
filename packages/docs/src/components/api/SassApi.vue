<template>
  <v-row>
    <v-col cols="12">
      <api-search
        :items="items"
        :label="$t('search-sass-api')"
        @input="genApi"
      />
    </v-col>
    <v-col
      v-for="api in apiItems"
      :key="api.text"
      cols="12"
    >
      <h2>{{ api.text }}</h2>
      <div
        :class="[
          'v-data-table',
          `theme--${$vuetify.theme.isDark ? 'dark' : 'light'}`
        ]"
      >
        <api-table :name="api.text.replace('$', '')" field="sass" />
      </div>
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import sassApi from '@/api/sass'

  export default {
    name: 'SassApi',

    data: () => ({
      apiItems: [],
      icons: {
        component: '$mdiViewDashboardOutline',
        functional: '$mdiViewStream',
        theme: '$mdiThemeLightDark',
      },
      types: {
        $vuetify: 'functional',
      },
      sassApi,
    }),

    computed: {
      locale: get('route/params@locale'),
      items () {
        const items = []
        for (const item of this.sassApi) {
          const type = this.types[item] || 'component'
          items.push({
            text: item,
            icon: this.icons[type],
          })
        }
        return items
      },
    },

    methods: {
      async genApi (items) {
        this.apiItems = items
      },
    },
  }
</script>
