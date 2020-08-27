<template>
  <v-row>
    <v-col cols="12">
      <api-search
        :items="items"
        :label="$i18n.t('search-sass-api')"
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
        <app-md
          tag="div"
          class="v-data-table__wrapper"
        >
          {{ api.table }}
        </app-md>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'
  import sassApi from '../../../build/sass-api'

  import genTable from '@/util/tables'

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
        dark: 'theme',
        globals: 'functional',
        light: 'theme',
      },
      sassApi,
    }),

    computed: {
      locale: get('route/params@locale'),
      items () {
        const items = []
        for (const item of Object.keys(this.sassApi) || []) {
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
        const apiItems = []
        for (const item of items) {
          const { text } = item
          const table = this.genTable(this.sassApi[text], this.locale)
          apiItems.push({ text, table })
        }
        this.apiItems = apiItems
      },
      genTable,
    },
  }
</script>
