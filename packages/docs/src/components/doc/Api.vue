<template>
  <div>
    <doc-heading>Generic.Pages.api</doc-heading>
    <v-card outlined>
      <v-toolbar
        class="px-2 py-3"
        color="primary"
        dark
        flat
        height="auto"
      >
        <v-layout wrap>
          <v-flex xs12 md4>
            <v-select
              v-model="current"
              :items="value"
              :class="$vuetify.breakpoint.mdAndUp ? '' : 'mb-3'"
              label="Available Component(s)"
              outlined
              :menu-props="{offsetY: true, contentClass: 'primary'}"
              prepend-inner-icon="mdi-view-dashboard"
              hide-details
            />
          </v-flex>
          <v-flex xs12 md4 offset-md4>
            <v-text-field
              v-model="search"
              type="search"
              clearable
              append-icon="search"
              label="Search..."
              outlined
              hide-details
              single-line
            />
          </v-flex>
        </v-layout>
      </v-toolbar>
      <v-tabs
        v-model="tab"
        background-color="transparent"
        :vertical="$vuetify.breakpoint.smAndUp"
        :slider-color="computedTabs.length ? 'primary' : 'transparent'"
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
          touchless
          class="white overflow-hidden"
        >
          <v-tab-item
            v-for="(tab, i) in computedTabs"
            :key="`tab-item-${i}`"
            class="overflow-y-auto"
            eager
            style="max-height: 800px;"
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
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
  // Utilities
  import api from '@vuetify/api-generator'

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
      },
      search: null,
      tab: null,
      tabs: ['api', 'props', 'slots', 'params', 'events', 'functions', 'functional', 'options'],
    }),

    computed: {
      component () {
        const component = {}

        for (const tab of this.tabs) {
          component[tab] = []
        }

        return {
          ...component,
          ...(api[this.current] || {}),
        }
      },
      computedTabs () {
        return this.tabs.filter(tab => (this.component[tab] || []).length > 0)
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
