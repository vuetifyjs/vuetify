<template lang="pug">
  views-doc(
    :toc="toc"
    :id="folder"
  )
    template(slot-scope="{ namespace }")
      section(v-if="usage")#usage
        helpers-section-head(value="Generic.Pages.usage")
        helpers-example(
          :new-in="usage.new"
          :file="`${folder}/${usage.file}`"
          :inverted="usage.inverted"
          :has-inverted="!usage.uninverted"
          :id="`usage-${-1}`"
          :key="usage.file"
          :desc="usage.desc"
        )

      section#api
        helpers-section-head(value="Generic.Pages.api")
        v-card
          v-tabs(
            v-model="tab"
            color="grey lighten-3"
            slider-color="primary"
          )
            template(v-for="(tab, i) in computedTabs")
              v-tab(
                :key="i"
                :href="`#${tab}`"
              ) {{ tab.replace(/([A-Z])/g, ' $1') }}
          v-card-title
            v-select(
              label="Component"
              hide-details
              single-line
              v-bind:items="components"
              v-model="current"
              auto
              :disabled="components.length < 2"
            )
            v-spacer
            v-spacer.hidden-sm-and-down
            v-text-field(
              append-icon="search"
              label="Search..."
              single-line
              hide-details
              v-model="search"
            )
          v-tabs-items(touchless v-model="tab").white
            v-tab-item(
              v-for="(tabItem, i) in computedTabs"
              :id="tabItem"
              :key="i"
            )
              v-card(flat v-if="hasTab(tabItem)")
                helpers-parameters(
                  :headers="headers[tabItem]"
                  :items="currentApi[tabItem]"
                  :namespace="namespace"
                  :search="search"
                  :target="current"
                  :type="tabItem"
                  :key="`${tabItem}${namespace}${current}`"
                )

      section(v-if="supplemental.length > 0")#supplemental
        helpers-section-head(value="Generic.Pages.supplemental")
        component(
          v-for="sup in supplemental"
          :key="sup"
          :is="`Misc${sup}`"
        )

      slot(name="top")
      section(v-if="examples.length > 1")#examples
        helpers-section-head(value="Generic.Pages.examples")
        template(v-for="(example, i) in examples.slice(1)")
          helpers-example(
            :header="example.header"
            :new-in="example.newIn"
            :file="`${folder}/${example.file}`"
            :inverted="example.inverted"
            :has-inverted="!example.uninverted"
            :id="`example-${camelCaseToDash(example.file)}`"
            :key="example.file"
            :desc="example.desc"
          )

      slot
</template>

<script>
  import api from 'api-generator'
  // Utilities
  import { camel } from '@/util/helpers'

  export default {
    inheritAttrs: false,

    props: {
      data: {
        type: Object,
        default: () => ({})
      }
    },

    data () {
      return {
        api,
        current: null,
        id: '',
        headers: {
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
      }
    },

    computed: {
      components () {
        let components = (this.data.components || []).slice()

        if (this.data.component) {
          components.unshift(this.data.component)
        }

        return components
      },
      computedTabs () {
        return this.tabs.filter(tab => (this.currentApi[tab] || []).length > 0)
      },
      currentApi () {
        return this.api[this.current] || {
          props: [],
          slots: [],
          scopedSlots: [],
          params: [],
          events: [],
          functions: [],
          functional: [],
          options: []
        }
      },
      examples () {
        return this.data.examples || []
      },
      folder () {
        return this.data.folder || this.$route.params.component
      },
      namespace () {
        const component = camel(this.$route.params.component)
        const section = camel(this.$route.params.section)

        return `${section}.${component}`
      },
      supplemental () {
        const namespace = `${this.namespace}.supplemental`
        return this.$te(namespace)
          ? this.$t(namespace)
          : this.$te(namespace, 'en')
            ? this.$t(namespace, 'en')
            : []
      },
      toc () {
        return 'Components'
      },
      usage () {
        return this.examples.slice(0, 1)[0]
      }
    },

    watch: {
      currentApi () {
        const api = this.currentApi[this.tab]

        if (
          !api ||
          (this.currentApi.hasOwnProperty(this.tab) &&
          api.length > 0)
        ) return

        for (let tab of ['props', 'slots', 'options']) {
          if (this.currentApi[tab].length > 0) {
            this.tab = tab
            break
          }
        }
      }
    },

    created () {
      if (this.components.length) {
        this.current = this.components[0]
      }
    },

    methods: {
      hasTab (tab) {
        return (this.currentApi[tab] || []).length > 0
      },
      camelCaseToDash (str) {
        return str.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase()
      }
    }
  }
</script>
