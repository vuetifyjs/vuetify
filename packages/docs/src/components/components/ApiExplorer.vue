<template>
  <v-layout wrap mb-5>
    <v-flex
      xs12
      mb-5
    >
      <v-autocomplete
        v-model="selected"
        :label="$t('Components.ApiExplorer.select')"
        :items="computedApi"
        solo
        prepend-inner-icon="mdi-database-search"
        clearable
        chips
        return-object
      >
        <template v-slot:selection="props">
          <v-chip
            :value="props.selected"
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
        <template v-slot:item="props">
          <v-list-item-action>
            <v-icon v-text="props.item.icon" />
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title
              :id="props.attrs['aria-labelledby']"
              v-text="props.item.text"
            />
            <v-list-item-subtitle v-text="props.item.subtext" />
          </v-list-item-content>
        </template>
      </v-autocomplete>
    </v-flex>
    <v-flex
      v-if="!selected"
      xs12
      text-xs-center
      grey--text
    >
      <h2
        class="display-1"
        v-text="$t('Components.ApiExplorer.search')"
      />
      <div v-text="$t('Components.ApiExplorer.or')" />
      <h2
        class="display-1"
        v-text="$t('Components.ApiExplorer.browseCategories')"
      />
    </v-flex>
    <v-flex
      v-else
      xs12
    >
      <provide-provider
        :key="composite"
        :namespace="namespace"
        :page="page"
      >
        <doc-api :value="[selected.text]" />
      </provide-provider>
    </v-flex>
  </v-layout>
</template>

<script>
  // Utilities
  import api from '@vuetify/api-generator'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'
  import { mapState } from 'vuex'
  import pluralize from 'pluralize'

  export default {
    name: 'ApiExplorerPage',

    components: {
      ProvideProvider: {
        provide () {
          return {
            overrideNamespace: this.namespace,
            overridePage: this.page,
          }
        },

        props: {
          namespace: {
            type: String,
            default: '',
          },
          page: {
            type: String,
            default: '',
          },
        },

        render (h) {
          return h('div', [this.$slots.default])
        },
      },
    },

    data: () => ({
      selected: null,
      directives: [
        'v-ripple',
        'v-touch',
        'v-scroll',
        'v-resize',
      ],
      grid: [
        'v-container',
        'v-layout',
        'v-flex',
        'v-spacer',
      ],
      search: '',
    }),

    computed: {
      ...mapState('app', ['components']),
      composite () {
        return `${this.namespace}-${this.page}`
      },
      computedApi () {
        const computedApi = []

        Object.keys(api).forEach(key => {
          if (
            key.indexOf('v-') < 0 ||
            this.directives.includes(key)
          ) return

          computedApi.push(this.genItem(key))
        })

        return computedApi.sort((a, b) => {
          if (a.text > b.text) return 1
          if (b.text > a.text) return -1
          return 0
        })
      },
      items () {
        if (!this.selected) return []

        return api[this.selected.text].props // come back to this
      },
      namespace () {
        return this.selected
          ? this.selected.namespace
          : undefined
      },
      page () {
        const str = this.selected.text.replace('v-', '')

        return this.selected
          ? pluralize(upperFirst(camelCase(str)))
          : undefined
      },
    },

    watch: {
      currentProxy (val) {
        this.current = (val || {}).text
      },
    },

    methods: {
      genItem (component) {
        let icon
        let namespace
        let subtext
        const text = component

        if (this.directives.includes(text)) {
          namespace = 'Directives'
          subtext = 'Directive'
          icon = 'mdi-function'
        } else if (this.grid.includes(text)) {
          namespace = 'Layout'
          subtext = 'Grid Component'
          icon = 'mdi-grid'
        } else if (text.indexOf('transition') > -1) {
          namespace = 'Motion'
          subtext = 'Transition'
          icon = 'mdi-clock-fast'
        } else if (api[text] && api[text].props && api[text].props.length === 0) {
          namespace = 'Components'
          subtext = 'Functional Components'
          icon = 'mdi-view-stream'
        } else {
          namespace = 'Components'
          subtext = 'Component'
          icon = 'mdi-view-dashboard'
        }

        return { icon, namespace, subtext, text }
      },
    },
  }
</script>
