<template lang="pug">
  page(:id="id")
    page-heading
      template(slot="title") {{ $t(`Components.${this.data.namespace}.header`) }}
      p(v-html="$t(`Components.${data.namespace}.headerText`)")

    section#usage
      section-heading {{ $t('Components.ComponentPage.usage') }}

      component-example(
        :header="`#${i + 1} ${genHeader(example)}`"
        :new-in="example.new"
        :file="`${data.namespace.toLowerCase()}/${example.file}`"
        :id="`example-${i + 1}`"
        :key="i"
        v-for="(example, i) in data.examples"
      )
        div(
          slot="desc"
          v-html="genDesc(example)"
        )

    section-heading {{ $t('Components.ComponentPage.examples') }}
    slot(name="top")
    section#examples
      component-example(
        :header="`#${i + 1} ${genHeader(example)}`"
        :new-in="example.new"
        :file="`${data.namespace.toLowerCase()}/${example.file}`"
        :id="`example-${i + 1}`"
        :key="i"
        v-for="(example, i) in data.examples"
      )
        div(
          slot="desc"
          v-html="genDesc(example)"
        )
    slot(name="bottom")
</template>

<script>
  export default {
    name: 'component-page',

    data: () => ({
      id: ''
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
