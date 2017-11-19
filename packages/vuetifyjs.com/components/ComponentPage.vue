<template lang="pug">
  page(v-bind="$attrs" :toc="toc")
    page-heading#introduction
      template(slot="title") {{ $t(`Components.${namespace}.header`) }}
      div(v-html="$t(`Components.${namespace}.headerText`)")

    section#usage
      section-heading(value="Components.ComponentPage.usage")
      component-example(
        :new-in="data.usage.new"
        :file="`${folder}/${data.usage.file}`"
        :inverted="data.usage.inverted"
        :has-inverted="!data.usage.uninverted"
        :id="`data.usage-${-1}`"
      )
        div(
          slot="desc"
          v-html="genDesc(data.usage)"
        )

    section#api
      section-heading(value="Components.ComponentPage.api")
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
              v-bind:items="getItems(p)"
            )

    slot(name="top")
    section#examples
      section-heading(value="Components.ComponentPage.examples")
      component-example(
        :header="`${genHeader(example)}`"
        :new-in="example.new"
        :file="`${folder}/${example.file}`"
        :inverted="example.inverted"
        :has-inverted="!example.uninverted"
        :id="`example-${i + 1}`"
        :key="i"
        v-for="(example, i) in data.examples"
      )
        div(
          slot="desc"
          v-html="genDesc(example)"
        )

    section-heading {{ $t('Components.ComponentPage.examples') }}
    slot(name="bottom")
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'

  export default {
    inheritAttrs: false,

    name: 'component-page',

    data: () => ({
      id: '',
      current: {
        props: null,
        slots: null,
        events: null,
        functional: null
      },
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
        return this.data.component
      },
      components () {
        let components = [this.component]

        if (this.data.components) {
          components = components.concat(this.data.components)
        }

        return components
      },
      name () {
        if (this.data.name) return this.data.name

        return this.data.component.split('-').slice(1).join('-')
      },
      folder () {
        return `${this.name}${this.data.plural ? '' : 's'}`
      },
      namespace () {
        const namespace = this.name.split('-').map(n => {
          return n.substr(0, 1).toUpperCase() + n.slice(1)
        }).join('')
        
        if (this.data.plural) return namespace

        return `${namespace}s`
      },
      toc () {
        return this.$t(`Components.ComponentPage.toc`)
      }
    },

    methods: {
      genDesc (example) {
        return this.$t(`Examples.${this.namespace}.${example.file}.desc`)
      },
      genHeader (example) {
        return this.$t(`Examples.${this.namespace}.${example.file}.header`)
      },
      getItems (name) {
        switch (name) {
          case 'props':
            return this.genComponentProps()
          break
        }
      },
      genComponentProps () {
        const props = {}

        this.components.forEach(component => {
          props[component] = this.$store.state.api[component]
        })

        return props
      }
    }
  }
</script>
