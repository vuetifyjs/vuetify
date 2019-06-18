<template>
  <div>
    <doc-heading>Generic.Pages.api</doc-heading>
    <v-card outlined>
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
        :key="current"
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
            <!-- <doc-scoped-slots v-if="tab === 'scopedSlots'"
              :slots="component[tab]"
              :lang="lang"
              :search="search"
            ></doc-scoped-slots> -->
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
      class: 'xs4',
    },
    {
      value: 'description',
      type: 'markdown',
      class: 'xs8 text-sm-right',
    },
    {
      value: 'default',
      type: 'markup',
      class: 'xs12 sm6 grey lighten-4',
    },
    {
      value: 'type',
      class: 'xs12 sm6 text-sm-right grey lighten-4',
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
            class: 'xs4',
          },
          {
            value: 'description',
            type: 'markdown',
            class: 'xs8 text-xs-right',
          },
        ],
        scopedSlots: [
          {
            value: 'name',
            class: 'xs4',
          },
          {
            value: 'description',
            type: 'markdown',
            class: 'xs8 text-xs-right',
          },
          {
            value: 'props',
            type: 'markup',
            class: 'xs12 grey lighten-4',
          },
        ],
        events: [
          {
            value: 'name',
            class: 'xs4',
          },
          {
            value: 'description',
            type: 'markdown',
            class: 'xs8 text-xs-right',
          },
          {
            value: 'value',
            type: 'markup',
            class: 'xs 12',
          },
        ],
        functions: [
          {
            value: 'name',
            class: '',
          },
          {
            value: 'signature',
            type: 'markup',
            class: 'text-xs-right',
          },
        ],
        functional: [
          {
            value: 'name',
            class: '',
          },
          {
            value: 'description',
            class: 'text-xs-right',
          },
        ],
        options: [...propProps],
      },
      search: null,
      tab: null,
      tabs: ['api', 'props', 'slots', 'scopedSlots', 'params', 'events', 'functions', 'functional', 'options'],
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
