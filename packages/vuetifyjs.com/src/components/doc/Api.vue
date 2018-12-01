<template>
  <div>
    <doc-heading>Generic.Pages.api</doc-heading>
    <v-card>
      <v-tabs
        :slider-color="computedTabs.length ? 'primary' : 'transparent'"
        v-model="tab"
        color="grey lighten-3"
      >
        <v-tab
          v-for="(tab, i) in computedTabs"
          :key="`tab-${i}`"
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
              :items="value"
              v-model="current"
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
          lazy
        >
          <v-card flat>
            <doc-parameters
              :headers="headers[tab]"
              :items="component[tab]"
              :search="search"
              :target="tab"
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

  export default {
    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },

    data: vm => ({
      current: vm.value && vm.value.length ? vm.value[0] : null,
      headers: {
        api: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'default', align: 'left', size: 6 },
          { value: 'type', align: 'right', size: 3 }
        ],
        props: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'default', align: 'left', size: 6 },
          { value: 'type', align: 'right', size: 3 }
        ],
        slots: [
          { value: 'name', align: 'left' }
        ],
        scopedSlots: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'props', align: 'right', size: 9 }
        ],
        events: [
          { value: 'name', align: 'left' },
          { value: 'value', align: 'right' }
        ],
        functions: [
          { value: 'name', align: 'left' },
          { value: 'signature', align: 'right' }
        ],
        functional: [
          { value: 'name', align: 'left' },
          { value: 'description', align: 'left' }
        ],
        options: [
          { value: 'name', align: 'left', size: 3 },
          { value: 'default', align: 'left', size: 3 },
          { value: 'type', align: 'right' }
        ]
      },
      search: null,
      tab: null,
      tabs: ['props', 'slots', 'scopedSlots', 'params', 'events', 'functions', 'functional', 'options']
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
