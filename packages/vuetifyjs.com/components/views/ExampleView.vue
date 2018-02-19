<template lang="pug">
  doc-view(
    :toc="toc"
    :id="folder"
  )
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
        template(v-for="(example, i) in examples.slice(1)")
          support-vuetify(v-if="i === 5" :key="i")
          example(
            :header="`${example.header}`"
            :new-in="example.new"
            :file="`${folder}/${example.file}`"
            :inverted="example.inverted"
            :has-inverted="!example.uninverted"
            :id="`example-${camelCaseToDash(example.file)}`"
            :key="example.file"
            :desc="example.desc"
          )
      section-head {{ $t('Generic.Pages.examples') }}

      slot
</template>

<script>
  import api from '@/api/api'
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
      currentApi () {
        return this.api[this.current] || {
          props: [],
          slots: [],
          scopedSlots: [],
          params: [],
          events: [],
          funtions: [],
          functional: [],
          options: []
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
        const namespace = `${this.namespace}.supplemental`
        return this.$te(namespace)
          ? this.$t(namespace)
          : this.$te(namespace, 'en')
            ? this.$t(namespace, 'en')
            : []
      },
      toc () {
        return this.$t(this.data.toc || `Generic.Pages.toc`)
      },
      usage () {
        return this.examples.slice(0, 1).shift()
      }
    },

    watch: {
      currentApi () {
        if (!this.currentApi.hasOwnProperty(this.tab)) this.tab = 'props'
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
