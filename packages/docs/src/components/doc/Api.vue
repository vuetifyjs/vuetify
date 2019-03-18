<template>
  <div>
    <doc-heading>Generic.Pages.api</doc-heading>
    <v-card>
      <v-tabs
        v-model="tab"
        :slider-color="computedTabs.length ? 'primary' : 'transparent'"
      >
        <v-tab
          v-for="(tab) in computedTabs"
          :key="`tab-${tab}`"
          :href="`#${tab}`"
        >
          {{ tab.replace(/([A-Z])/g, ' $1') }}
        </v-tab>
      </v-tabs>

      <v-card-text>
        <v-layout justify-space-between>
          <v-flex
            xs12
            sm4
          >
            <v-select
              v-model="current"
              :items="value"
              :disabled="value.length < 2"
              hide-details
              single-line
              menu-props="auto"
            />
          </v-flex>

          <v-flex xs12 sm4>
            <v-text-field
              v-model="search"
              append-icon="search"
              label="Search..."
              single-line
              hide-details
            />
          </v-flex>
        </v-layout>
      </v-card-text>

      <v-tabs-items
        v-model="tab"
        touchless
        class="white"
      >
        <v-tab-item
          v-for="(tab, i) in computedTabs"
          :key="`tab-item-${i}`"
          :value="tab"
          eager
        >
          <v-card flat>
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
    </v-card>
  </div>
</template>

<script>
  // Utilities
  import api from '@vuetify/api-generator'

  const propProps = [
    {
      value: 'name',
      class: 'xs6 sm3 lg2'
    },
    {
      value: 'default',
      class: 'xs6 sm3 text-xs-right'
    },
    {
      value: 'type',
      class: 'xs6 ml-auto sm4 text-sm-right'
    }
  ]

  export default {
    props: {
      lang: {
        type: String,
        default: ''
      },
      value: {
        type: Array,
        default: () => ([])
      }
    },

    data: vm => ({
      current: vm.value && vm.value.length ? vm.value[0] : null,
      headers: {
        api: [...propProps],
        props: [...propProps],
        slots: [
          {
            value: 'name',
            class: 'left'
          }
        ],
        scopedSlots: [
          {
            value: 'name',
            class: 'xs3'
          },
          {
            value: 'props',
            class: 'xs9'
          }
        ],
        events: [
          {
            value: 'name',
            class: ''
          },
          {
            value: 'value',
            class: 'text-xs-right'
          }
        ],
        functions: [
          {
            value: 'name',
            class: ''
          },
          {
            value: 'signature',
            class: 'text-xs-right'
          }
        ],
        functional: [
          {
            value: 'name',
            class: ''
          },
          {
            value: 'description',
            class: 'text-xs-right'
          }
        ],
        options: [...propProps]
      },
      search: null,
      tab: null,
      tabs: ['api', 'props', 'slots', 'scopedSlots', 'params', 'events', 'functions', 'functional', 'options']
    }),

    computed: {
      component () {
        const component = {}

        for (const tab of this.tabs) {
          component[tab] = []
        }

        return {
          ...component,
          ...(api[this.current] || {})
        }
      },
      computedTabs () {
        return this.tabs.filter(tab => (this.component[tab] || []).length > 0)
      }
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
      }
    }
  }
</script>
