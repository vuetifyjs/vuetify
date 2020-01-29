<template>
  <v-card
    class="mb-6"
    outlined
  >
    <v-toolbar
      color="primary"
      dark
      flat
      height="auto"
    >
      <v-container class="px-0">
        <v-row no-gutters>
          <v-col
            cols="12"
            md="4"
          >
            <v-select
              v-model="current"
              :class="$vuetify.breakpoint.mdAndUp ? '' : 'mb-6'"
              :items="value"
              :menu-props="{ offsetY: true, contentClass: 'primary' }"
              color="white"
              hide-details
              label="Available Component(s)"
              outlined
              prepend-inner-icon="mdi-view-dashboard"
            />
          </v-col>

          <v-col
            cols="12"
            md="4"
            offset-md="4"
          >
            <v-text-field
              v-model="search"
              append-icon="mdi-magnify"
              clearable
              color="white"
              hide-details
              label="Search..."
              outlined
              single-line
              type="search"
            />
          </v-col>
        </v-row>
      </v-container>
    </v-toolbar>

    <v-tabs
      v-model="tab"
      :slider-color="computedTabs.length ? 'primary' : 'transparent'"
      :vertical="$vuetify.breakpoint.smAndUp"
    >
      <v-tab
        v-for="(tab, i) in computedTabs"
        :key="`tab-${i}`"
        :class="[$vuetify.breakpoint.smAndUp && 'justify-start']"
      >
        {{ tab.replace(/([A-Z])/g, ' $1') }}
      </v-tab>

      <v-tabs-items
        :key="current"
        v-model="tab"
        class="white overflow-hidden"
        touchless
      >
        <v-tab-item
          v-for="(tab, i) in computedTabs"
          :key="`tab-item-${i}`"
          class="overflow-y-auto"
          eager
          style="max-height: 800px;"
        >
          <v-card
            flat
            tile
          >
            <doc-parameters
              :headers="headers[tab]"
              :items="component[tab]"
              :lang="lang"
              :search="search"
              :target="current"
              :type="tab"
            />
          </v-card>
        </v-tab-item>
      </v-tabs-items>
    </v-tabs>
  </v-card>
</template>

<script>
  // Utilities
  import {
    get,
  } from 'vuex-pathify'

  import api from '@vuetify/api-generator'
  import variableApi from '@vuetify/api-generator/dist/variables'

  const propProps = [
    {
      value: 'name',
      class: 'xs6 md3',
    },
    {
      value: 'type',
      class: 'xs6 md2 text-xs-right',
    },
    {
      value: 'default',
      class: 'xs12 md7 text-md-right',
    },
    {
      value: 'description',
      class: 'xs12 mt-2',
    },
    {
      value: 'example',
      class: 'xs12 mt-2',
    },
  ]

  export default {
    name: 'DocApiItems',

    props: {
      lang: {
        type: String,
        default: '',
      },
      value: {
        type: Array,
        default: () => ([]),
      },
    },

    data: vm => ({
      current: vm.value && vm.value.length ? vm.value[0] : null,
      headers: {
        api: [...propProps],
        props: [...propProps],
        slots: [
          {
            value: 'name',
            class: 'xs12',
          },
          {
            value: 'description',
            type: 'markdown',
            class: 'xs12 mt-2',
          },
          {
            value: 'props',
            class: 'xs12 mt-2',
          },
        ],
        events: [
          {
            value: 'name',
            class: 'xs12',
          },
          {
            value: 'description',
            class: 'xs12 mt-2',
          },
          {
            value: 'value',
            class: 'xs12 mt-2',
          },
        ],
        functions: [
          {
            value: 'name',
            class: 'xs12',
          },
          {
            value: 'description',
            type: 'markdown',
            class: 'xs12 mt-2',
          },
          {
            value: 'signature',
            class: 'xs12 mt-2',
          },
        ],
        functional: [
          {
            value: 'name',
            class: 'xs12',
          },
          {
            value: 'description',
            class: 'xs12 mt-2',
          },
        ],
        options: [...propProps],
        sass: [
          {
            value: 'name',
            class: 'xs12',
          },
          {
            value: 'default',
            type: 'sass',
            class: 'xs12 mt-2',
          },
        ],
      },
      search: null,
      tab: null,
      tabs: ['api', 'props', 'slots', 'params', 'events', 'functions', 'functional', 'options', 'sass'],
    }),

    computed: {
      ...get('documentation', ['namespace', 'page']),
      component () {
        const component = {}

        for (const tab of this.tabs) {
          component[tab] = []
        }

        return {
          ...component,
          ...(api[this.current] || {}),
          sass: variableApi[this.current] || [],
        }
      },
      computedTabs () {
        return this.tabs.filter(tab => (this.component[tab] || []).length > 0)
      },
      computedHeading () {
        const title = `${this.namespace}.${this.page}.apiHeading`

        return this.$te(title, 'en') ? 'apiHeading' : 'Generic.Pages.api'
      },
    },

    watch: {
      component () {
        const api = this.component[this.tab]

        if (api && api.length) return

        for (const tab of ['props', 'slots', 'options']) {
          if (this.component[tab] && this.component[tab].length > 0) {
            this.tab = tab
            return
          }
        }

        this.tab = ''
      },
    },
  }
</script>
