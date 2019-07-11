<template>
  <div>
    <doc-heading>Generic.Pages.api</doc-heading>
    <v-card outlined>
      <v-layout
        pt-3
        grey
        lighten-4
        wrap
      >
        <v-flex xs12 md4 px-3 mb-3>
          <v-select
            v-model="current"
            :items="value"
            label="Available Component(s)"
            menu-props="offset-y"
            hide-details
            outlined
            prepend-inner-icon="mdi-view-dashboard"
          />
        </v-flex>
        <v-flex xs12 md4 offset-md4 px-3 mb-3>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search..."
            single-line
            hide-details
            outlined
          />
        </v-flex>
        <v-flex xs12>
          <v-tabs
            v-model="tab"
            background-color="transparent"
            :vertical="$vuetify.breakpoint.smAndUp"
            :slider-color="computedTabs.length ? 'primary' : 'transparent'"
          >
            <v-tab
              v-for="(tab) in computedTabs"
              :key="`tab-${tab}`"
              :href="`#${tab}`"
              class="justify-start"
            >
              {{ tab.replace(/([A-Z])/g, ' $1') }}
            </v-tab>

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
                class="scroll-y"
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
        </v-flex>
      </v-layout>
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
        ],
        scopedSlots: [
          {
            value: 'name',
            class: 'xs4',
          },
          {
            value: 'props',
            class: 'xs8 text-xs-right',
          },
          {
            value: 'description',
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
