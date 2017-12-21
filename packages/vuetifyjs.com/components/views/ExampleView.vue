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
        v-tabs(
          v-model="tab"
        ).elevation-1
          v-tabs-bar(color="grey lighten-3").px-3
            v-tabs-slider(color="primary")
            v-tabs-item(
              v-for="(tab, i) in tabs"
              :href="`#${tab}`"
              :key="i"
              v-if="hasTab(tab)"
            ) {{ tab }}
          v-card(flat)
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
          v-tabs-items(touchless).white
            v-tabs-content(
              v-for="(tab, i) in tabs"
              :id="tab"
              :key="i"
            )
              v-card(flat)
                parameters(
                  :headers="headers[tab]"
                  :items="currentApi[tab]"
                  :namespace="namespace"
                  :search="search"
                  :target="current"
                  :type="tab"
                  v-if="hasTab(tab)"
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
            { text: this.$t('Generic.Pages.description'), value: 'desc', align: 'left' }
          ],
          props: [
            { text: this.$t('Generic.Pages.options'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.type'), value: 'type', align: 'left' },
            { text: this.$t('Generic.Pages.default'), value: 'default', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'desc', align: 'left' }
          ],
          slots: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          events: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ],
          functional: [
            { text: this.$t('Generic.Pages.name'), value: 'name', align: 'left' },
            { text: this.$t('Generic.Pages.description'), value: 'description', align: 'left' }
          ]
        },
        search: null,
        tab: null,
        tabs: ['props', 'slots', 'params', 'events', 'functional']
      }
    },

    props: {
      data: Object
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
        const api = this.api[this.current] || {
          params: [],
          props: [],
          slots: [],
          scopedSlots: []
        }

        const add = `${this.namespace}`

        Object.keys(api).forEach(key => {
          const lang = `${add}.${key}`

          if (!this.$te(lang)) return

          const items = this.$t(lang)[0]

          if (!items[this.current]) return

          api[key] = api[key].concat(items[this.current])
        })

        return api
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
