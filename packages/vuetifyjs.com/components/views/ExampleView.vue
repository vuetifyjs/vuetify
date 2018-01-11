<template lang="pug">
  doc-view(:toc="toc")
    template(slot-scope="{ namespace }")
      section(v-if="usage")#usage
        section-head(value="Generic.Pages.usage")
        example(
          :new-in="usage.new"
          :file="`${folder}/${usage.file}`"
          :inverted="usage.inverted"
          :has-inverted="!usage.uninverted"
          :id="`usage-${-1}`"
          :key="usage.file"
          :desc="usage.desc"
        )

      section#api
        section-head(value="Generic.Pages.api")
        v-card
          v-tabs(
            v-model="tab"
            color="grey lighten-3"
            slider-color="primary"
          )
            template(v-for="(tab, i) in tabs")
              v-tab(
                :key="i"
                :href="`#${tab}`"
                v-if="hasTab(tab)"
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
              v-for="(tabItem, i) in tabs"
              :id="tabItem"
              :key="i"
            )
              v-card(flat v-if="hasTab(tabItem)")
                parameters(
                  :headers="headers[tabItem]"
                  :items="currentApi[tabItem]"
                  :namespace="namespace"
                  :search="search"
                  :target="current"
                  :type="tabItem"
                  :key="`${tabItem}${namespace}${current}`"
                )

      section(v-if="supplemental.length > 0")#supplemental
        section-head(value="Generic.Pages.supplemental")
        component(
          v-for="sup in supplemental"
          :key="sup"
          :is="sup"
        )

      slot(name="top")
      section(v-if="examples.length > 1")#examples
        section-head(value="Generic.Pages.examples")
        example(
          :header="`${example.header}`"
          :new-in="example.new"
          :file="`${folder}/${example.file}`"
          :inverted="example.inverted"
          :has-inverted="!example.uninverted"
          :id="`example-${camelCaseToDash(example.file)}`"
          :key="example.file"
          :desc="example.desc"
          v-for="(example, i) in examples.slice(1)"
        )
      section-head {{ $t('Generic.Pages.examples') }}

      slot
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import { camel, capitalize, kebab } from '@/util/helpers'

  export default {
    inheritAttrs: false,

    data () {
      return {
        current: null,
        id: '',
        headers: {
          params: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.type'), value: 'type', align: 'left' },
            { text: this.$t('Generic.Pages.default'), value: 'default', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          props: [
            { text: this.$t('Generic.Pages.options'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.type'), value: 'type', align: 'left' },
            { text: this.$t('Generic.Pages.default'), value: 'default', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          slots: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          scopedSlots: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.props'), value: 'props', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          events: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          functions: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.parameters'), value: 'parameters', align: 'left' },
            { text: this.$t('Generic.Pages.return'), value: 'return', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          functional: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ]
        },
        search: null,
        tab: null,
        tabs: ['props', 'slots', 'scopedSlots', 'params', 'events', 'functions', 'functional']
      }
    },

    props: {
      data: Object
    },

    watch: {
      currentApi () {
        if (!this.currentApi.hasOwnProperty(this.tab)) this.tab = 'props'
      }
    },

    computed: {
      ...mapState({
        api: state => state.api
      }),
      components () {
        let components = (this.data.components || []).slice()

        if (this.data.component) {
          components.unshift(this.data.component)
        }

        return components
      },
      currentApi () {
        return this.api[this.current] || {
          params: [],
          props: [],
          slots: [],
          scopedSlots: []
        }
      },
      examples () {
        const examples = this.data.examples || {}

        return Object.keys(examples).map(key => {
          return Object.assign({
            file: key
          }, examples[key])
        })
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
        return this.$te(`${this.namespace}.supplemental`)
          ? this.$t(`${this.namespace}.supplemental`)
          : []
      },
      toc () {
        return this.$t(`Generic.Pages.toc`)
      },
      usage () {
        return this.examples.slice(0, 1).shift()
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
        return str.replace( /([a-z])([A-Z])/g, '$1-$2' ).toLowerCase()
      }
    }
  }
</script>
