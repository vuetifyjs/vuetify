<template>
  <doc-view>
    <v-layout wrap mb-5>
      <v-flex
        xs12
        mb-5
      >
        <v-combobox
          v-model="currentProxy"
          :label="$t('Components.ApiExplorer.select')"
          :items="computedApi"
          solo
          prepend-inner-icon="mdi-database-search"
          clearable
          chips
        >
          <template
            slot="selection"
            slot-scope="props"
          >
            <v-chip
              :selected="props.selected"
              color="primary"
              class="white--text"
              label
            >
              <v-icon
                left
                v-text="props.item.icon"
              />
              <span v-text="props.item.text" />
            </v-chip>
          </template>
          <template
            slot="item"
            slot-scope="props"
          >
            <v-list-tile-action>
              <v-icon v-text="props.item.icon" />
            </v-list-tile-action>
            <v-list-tile-content>
              <v-list-tile-title v-text="props.item.text" />
              <v-list-tile-sub-title v-text="props.item.subtext" />
            </v-list-tile-content>
          </template>
        </v-combobox>
      </v-flex>
      <v-flex
        v-if="!current"
        xs12
        text-xs-center
        grey--text
      >
        <h3
          class="display-1"
          v-text="$t('Components.ApiExplorer.search')"
        />
        <p v-text="$t('Components.ApiExplorer.searchText')" />
      </v-flex>
      <v-flex
        v-else
        xs12
      >
        <v-card>
          <v-tabs
            v-model="tab"
            color="grey lighten-3"
            slider-color="primary"
          >
            <v-tab
              v-for="(tab, i) in computedTabs"
              :key="i"
              :href="`#${tab}`"
            >
              {{ tab.replace(/([A-Z])/g, ' $1') }}
            </v-tab>
          </v-tabs>
          <v-card-title>
            <v-spacer />
            <v-text-field
              v-model="search"
              append-icon="search"
              placeholder="Search..."
              single-line
              hide-details
            />
          </v-card-title>
          <v-tabs-items
            v-model="tab"
            touchless
          >
            <v-tab-item
              v-for="(tabItem, i) in computedTabs"
              :id="tabItem"
              :key="i"
            >
              <v-card
                v-if="hasTab(tabItem)"
                flat
              >
                <parameters
                  :headers="headers[tabItem]"
                  :items="currentApi[tabItem]"
                  :namespace="currentProxy.namespace"
                  :search="search"
                  :target="current"
                  :type="tabItem"
                  :key="`${tabItem}${namespace}${current}`"
                />
              </v-card>
            </v-tab-item>
          </v-tabs-items>
        </v-card>
      </v-flex>
    </v-layout>
  </doc-view>
</template>

<script>
  import api from 'api-generator'
  import { camel } from '@/util/helpers'
  import { mapState } from 'vuex'
  import ExampleView from '@/components/views/ExampleView'

  export default {
    name: 'ApiExplorerPage',

    extends: ExampleView,

    data: () => ({
      current: null,
      currentProxy: null,
      directives: [
        'v-ripple',
        'v-touch',
        'v-scroll',
        'v-resize'
      ],
      grid: [
        'v-container',
        'v-layout',
        'v-flex',
        'v-spacer'
      ]
    }),

    computed: {
      ...mapState('app', ['components']),
      computedApi () {
        const computedApi = []

        for (const section in this.components) {
          for (const component of this.components[section].components) {
            // Temporarily remove directives
            if (this.directives.includes(component)) continue

            computedApi.push(this.genItem(section, component))
          }
        }

        return computedApi.sort((a, b) => {
          if (a.text > b.text) return 1
          if (b.text > a.text) return -1
          return 0
        })
      }
    },

    watch: {
      currentProxy (val) {
        this.current = (val || {}).text
      }
    },

    methods: {
      genItem (section, component) {
        let icon
        let namespace
        let subtext
        let text = component

        if (this.directives.includes(text)) {
          namespace = 'Directives'
          subtext = 'Directive'
          icon = 'mdi-function'
        } else if (this.grid.includes(text)) {
          namespace = 'Layout'
          section = 'Grid'
          subtext = 'Grid Component'
          icon = 'mdi-grid'
        } else if (text.indexOf('transition') > -1) {
          namespace = 'Motion'
          subtext = 'Transition'
          icon = 'mdi-clock-fast'
        } else if (api[text] && api[text].props.length === 0) {
          namespace = 'Components'
          subtext = 'Functional Components'
          icon = 'mdi-view-stream'
        } else {
          namespace = 'Components'
          subtext = 'Component'
          icon = 'mdi-view-dashboard'
        }

        namespace += `.${camel(section)}`

        return { icon, namespace, subtext, text }
      }
    }
  }
</script>
