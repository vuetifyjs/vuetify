<template>
  <v-row>
    <v-col cols="12">
      <v-autocomplete
        :items="items"
        clearable
        :label="$i18n.t('search-api')"
        multiple
        prepend-inner-icon="$mdiDatabaseSearch"
        return-object
        solo
        @input="genApi"
      >
        <template v-slot:selection="{ item, selected }">
          <v-chip
            :value="selected"
            class="white--text"
            color="primary"
            label
          >
            <v-icon
              left
              v-text="item.icon"
            />
            <span v-text="item.text" />
          </v-chip>
        </template>

        <template v-slot:item="{ attrs, item }">
          <v-list-item-action>
            <v-icon v-text="item.icon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              :id="attrs['aria-labelledby']"
              v-text="item.text"
            />
            <v-list-item-subtitle v-text="$i18n.t(item.type)" />
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-col>
    <v-col
      v-for="api in apiItems"
      :key="api.text"
      cols="12"
    >
      <h2>{{ api.text }}</h2>
      <div
        v-for="(md, type) in api.tables"
        :key="`${api.text}-${type}`"
      >
        <h3>{{ type }}</h3>
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
            {{ md }}
          </app-md>
        </div>
      </div>
    </v-col>
  </v-row>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  import genTable from '@/util/tables'

  export default {
    name: 'ApiSearch',

    data: () => ({
      apiItems: [],
      icons: {
        component: '$mdiViewDashboardOutline',
        directive: '$mdiFunction',
        functional: '$mdiViewStream',
        grid: '$mdiGrid',
        transition: '$mdiClockFast',
      },
      pageTypes: {
        'v-app-bar-nav-icon': 'functional',
        'v-breadcrumbs-divider': 'functional',
        'v-card-actions': 'functional',
        'v-simple-checkbox': 'functional',
        'v-subtitle': 'functional',
        'v-text': 'functional',
        'v-title': 'functional',
        'v-list-item-action': 'functional',
        'v-list-item-action-text': 'functional',
        'v-list-item-content': 'functional',
        'v-list-item-icon': 'functional',
        'v-list-item-subtitle': 'functional',
        'v-list-item-title': 'functional',
        'v-stepper-header': 'functional',
        'v-stepper-items': 'functional',
        'v-table-overflow': 'functional',
        'v-toolbar-items': 'functional',
        'v-toolbar-title': 'functional',
        'v-carousel-reverse-transition': 'transition',
        'v-carousel-transition': 'directive',
        'v-dialog-bottom-transition': 'transition',
        'v-dialog-transition': 'transition',
        'v-expand-transition': 'transition',
        'v-expand-x-transition': 'transition',
        'v-fab-transition': 'transition',
        'v-fade-transition': 'transition',
        'v-menu-transition': 'transition',
        'v-scale-transition': 'transition',
        'v-scoll-x-reverse-transition': 'transition',
        'v-scoll-x-transition': 'transition',
        'v-scoll-y-reverse-transition': 'transition',
        'v-scoll-y-transition': 'transition',
        'v-slide-x-reverse-transition': 'transition',
        'v-slide-y-reverse-transition': 'transition',
        'v-slide-y-transition': 'transition',
        'v-tab-reverse-transition': 'transition',
        'v-tab-transition': 'transition',
        'v-click-oustide': 'directive',
        'v-color': 'directive',
        'v-intersect': 'directive',
        'v-mutate': 'directive',
        'v-resize': 'directive',
        'v-ripple': 'directive',
        'v-scroll': 'directive',
        'v-touch': 'directive',
        'v-col': 'grid',
        'v-container': 'grid',
        'v-flex': 'grid',
        'v-layout': 'grid',
        'v-row': 'grid',
        'v-spacer': 'grid',
      },
      selected: [],
    }),

    computed: {
      locale: get('route/params@locale'),
      pages: get('pages/pages'),
      items () {
        const apiPages = []
        for (const [path, page] of Object.entries(this.pages)) {
          const splitPage = path.split('/')
          if (splitPage.length > 3 && splitPage[2] === 'api') {
            const pageItem = this.genPageItem(page, splitPage[1])
            apiPages.push(pageItem)
          }
        }
        return apiPages
      },
    },

    methods: {
      async genApi (items) {
        const apiItems = []
        for (const api of items) {
          const tables = {}
          const { [api.text]: apiData } = await import(
            /* webpackChunkName: "api" */
            /* webpackMode: "lazy" */
            '../../../build/api'
          ) || {}
          const { [api.text]: sassApiData } = await import(
            /* webpackChunkName: "api" */
            /* webpackMode: "lazy" */
            '../../../build/sass-api'
          ) || []
          if (sassApiData.length) {
            apiData.sass = sassApiData
          }
          for (const [header, value] of Object.entries(apiData)) {
            if (header === 'mixins' || !value.length) continue
            const table = this.genTable(value, this.locale)
            tables[header] = table
          }
          apiItems.push({ ...api, tables })
        }
        this.apiItems = apiItems
      },
      genPageItem (page, lang) {
        const type = this.pageTypes[page] || 'component'
        return {
          text: page,
          value: `${lang}/${page}.md`,
          lang,
          type,
          icon: this.icons[type],
        }
      },
      genTable,
    },
  }
</script>
