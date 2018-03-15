<template>
  <doc-view>
    <v-layout wrap mb-5>
      <v-flex
        xs12
        mb-5
      >
        <v-select
          solo
          prepend-icon="mdi-database-search"
          clearable
          combobox
          chips
          return-object
          v-model="currentProxy"
          :label="$t('Components.ApiExplorer.select')"
          :items="computedApi"
        >
          <template
            slot="selection"
            slot-scope="props"
          >
            <v-chip
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
        </v-select>
      </v-flex>
      <v-flex
        xs12
        v-if="!current"
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
        xs12
        v-else
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
              append-icon="search"
              placeholder="Search..."
              single-line
              hide-details
              v-model="search"
            />
          </v-card-title>
          <v-tabs-items
            touchless
            v-model="tab"
          >
            <v-tab-item
              v-for="(tabItem, i) in computedTabs"
              :id="tabItem"
              :key="i"
            >
              <v-card
                flat
                v-if="hasTab(tabItem)"
              >
                <parameters
                  :headers="headers[tabItem]"
                  :items="currentApi[tabItem]"
                  :namespace="namespace"
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
  import api from '@/api/api'

  import ExampleView from '@/components/views/ExampleView'

  export default {
    name: 'AtAGlance',

    extends: ExampleView,

    data: () => ({
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
      computedApi () {
        return Object.keys(api)
          .filter(a => a !== '$vuetify')
          .map(text => {
            const icon = this.getIcon(text)
            return Object.assign({}, {
              text,
              subtext: this.getSubText(icon),
              icon
            })
          })
          .sort((a, b) => {
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
      getIcon (text) {
        const directives = this.directives
        const grid = this.grid

        if (directives.includes(text)) return 'mdi-function'
        if (grid.includes(text)) return 'mdi-grid'
        if (text.indexOf('transition') > -1) return 'mdi-clock-fast'
        if (api[text].props.length === 0) return 'mdi-view-stream'
        else return 'mdi-view-dashboard'
      },
      getSubText (text) {
        switch (text) {
          case 'mdi-function': return 'Directive'
          case 'mdi-grid': return 'Grid Component'
          case 'mdi-clock-fast': return 'Transition'
          case 'mdi-view-stream': return 'Functional Component'
          default: return 'Component'
        }
      }
    }
  }
</script>
