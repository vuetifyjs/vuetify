<template lang="pug">
  page(:id="id")
    page-heading
      template(slot="title") {{ $t(`Components.${this.data.namespace}.header`) }}
      div(v-html="$t(`Components.${data.namespace}.headerText`)")

    section#usage
      section-heading(value="Components.ComponentPage.usage")
      component-example(
        :new-in="data.usage.new"
        :file="`${data.folder}/${data.usage.file}`"
        :id="`data.usage-${-1}`"
      )
        div(
          slot="desc"
          v-html="genDesc(data.usage)"
        )

    section(v-if="data.props")#api
      section-heading(value="Components.ComponentPage.api")
      v-tabs(v-model="tabs" v-bind:scrollable="false").elevation-1
        v-tabs-bar.grey.lighten-3.px-3
          v-tabs-slider(color="primary")
          v-tabs-item(
            v-for="(p, i) in ['props', 'slots', 'events', 'functional']"
            v-show="data[p]"
            v-bind:href="`#${p}`"
            v-bind:key="i"
          ) {{ p }}
        v-tabs-items
          v-tabs-content(
            v-for="(p, i) in ['props', 'slots', 'events', 'functional']"
            v-if="data[p]"
            v-bind:id="p"
            v-bind:key="i"
          )
            component-parameters(
              v-bind:headers="headers[p]"
              v-bind:data="data[p]"
              v-bind:type="p"
            )

    slot(name="top")
    section#examples
      section-heading(value="Components.ComponentPage.examples")

      component-example(
        :header="`#${i + 1} ${genHeader(example)}`"
        :new-in="example.new"
        :file="`${data.folder}/${example.file}`"
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
  export default {
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
          { text: 'Option', value: 'prop', align: 'left' },
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
      tabs: null
    }),

    props: {
      data: Object,
      default: () => {}
    },

    methods: {
      genDesc (example) {
        return this.$t(`Examples.${this.data.namespace}.${example.file}.desc`)
      },
      genHeader (example) {
        return this.$t(`Examples.${this.data.namespace}.${example.file}.header`)
      }
    }
  }
</script>
