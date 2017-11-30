<template lang="pug">
  doc-view(:toc="toc")
    template(slot-scope="{ namespace }")
      section#usage
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
          :scrollable="false"
        ).elevation-1
          v-tabs-bar.grey.lighten-3.px-3
            v-tabs-slider(color="primary")
            v-tabs-item(
              v-for="(p, i) in tabs"
              v-bind:href="`#${p}`"
              v-bind:key="i"
            ) {{ p }}
          v-tabs-items
            v-tabs-content(
              v-for="(p, i) in tabs"
              v-bind:id="p"
              v-bind:key="i"
            )
              parameters(
                v-bind:headers="headers[p]"
                v-bind:type="p"
                v-bind:api="api"
                v-bind:namespace="namespace"
                v-bind:components="components"
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
          :id="`example-${i + 1}`"
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
  import { capitalize, kebab } from '@/util/helpers'

  export default {
    inheritAttrs: false,

    data () {
      return {
        id: '',
        headers: {
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
        tab: null,
        tabs: ['props', 'slots']
      }
    },

    props: {
      data: Object
    },

    computed: {
      ...mapState({
        api: state => state.api
      }),
      component () {
        if (this.data.component) return this.data.component

        return this.data.components[0]
      },
      components () {
        let components = (this.data.components || []).slice()

        if (this.data.component) {
          components.unshift(this.data.component)
        }

        return components
      },
      computedTabs () {
        return this.tabs.filter(tab => this.hasTab(tab))
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
      toc () {
        return this.$t(`Generic.Pages.toc`)
      },
      usage () {
        return this.examples.slice(0, 1).shift()
      }
    },

    methods: {
      hasTab (tab) {
        return true // TODO: setup this functionality
      }
    }
  }
</script>
