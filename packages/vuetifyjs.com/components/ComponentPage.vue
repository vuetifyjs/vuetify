<template lang="pug">
  page(:toc="toc")
    template(slot-scope="{ namespace }")
      section#usage
        section-head(value="Components.ComponentPage.usage")
        component-example(
          :new-in="usage.new"
          :file="`${folder}/${usage.file}`"
          :inverted="usage.inverted"
          :has-inverted="!usage.uninverted"
          :id="`usage-${-1}`"
          :key="usage.file"
        )
          markdown(
            slot="desc"
            :source="genDesc(usage)"
          )

      section#api
        section-head(value="Components.ComponentPage.api")
        v-tabs(v-model="tab" v-bind:scrollable="false").elevation-1
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
              component-parameters(
                v-bind:headers="headers[p]"
                v-bind:type="p"
                v-bind:api="api"
                v-bind:namespace="namespace"
                v-bind:components="components"
              )

      slot(name="top")
      section#examples
        section-head(value="Components.ComponentPage.examples")
        component-example(
          :header="`${genHeader(example)}`"
          :new-in="example.new"
          :file="`${folder}/${example.file}`"
          :inverted="example.inverted"
          :has-inverted="!example.uninverted"
          :id="`example-${i + 1}`"
          :key="example.file"
          v-for="(example, i) in examples.slice(1)"
        )
          markdown(
            slot="desc"
            :source="genDesc(example)"
          )
      section-head {{ $t('Components.ComponentPage.examples') }}
      slot
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import { capitalize, kebab } from '@/util/helpers'

  export default {
    inheritAttrs: false,

    name: 'component-page',

    data: () => ({
      id: '',
      headers: {
        props: [
          { text: 'Option', value: 'name', align: 'left' },
          { text: 'Type(s)', value: 'type', align: 'left' },
          { text: 'Default', value: 'default', align: 'left' },
          { text: 'Description', value: 'desc', align: 'left' }
        ],
        slots: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Description', value: 'description', align: 'left' }
        ],
        events: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Description', value: 'description', align: 'left' }
        ],
        functional: [
          { text: 'Name', value: 'name', align: 'left' },
          { text: 'Description', value: 'description', align: 'left' }
        ]
      },
      tab: null,
      tabs: ['props', 'slots']
    }),

    props: {
      data: Object,
      default: () => {}
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
      examples () {
        const examples = this.data.examples || {}

        return Object.keys(examples).map(key => {
          return Object.assign({
            file: key
          }, examples[key])
        })
      },
      name () {
        if (this.data.name) return this.data.name

        return this.component.split('-').slice(1).join('-')
      },
      folder () {
        return this.data.folder || this.$route.params.component
      },
      plural () {
        return this.name[this.name.length - 1] === 's'
      },
      toc () {
        return this.$t(`Components.ComponentPage.toc`)
      },
      usage () {
        return this.examples.slice(0, 1).shift()
      }
    },

    methods: {
      genDesc (example) {
        return example.desc
      },
      genHeader (example) {
        return example.header
      }
    }
  }
</script>
