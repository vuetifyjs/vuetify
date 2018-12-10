<template>
  <div>
    <doc-heading>Generic.Pages.examples</doc-heading>

    <div />

    <v-expansion-panel>
      <v-expansion-panel-content
        v-for="(example, i) in examples"
        :key="i"
      >
        <div slot="header">
          <doc-heading :key="`heading-${i}`">
            {{ example.header }}
          </doc-heading>
        </div>
        <v-card class="pa-3 px-5">
          <doc-text :key="`text-${i}`">
            {{ example.desc }}
          </doc-text>
        </v-card>
        <doc-example
          :key="i"
          :value="value[i]"
        />
      </v-expansion-panel-content>
    </v-expansion-panel>
  </div>
</template>

<script>

  export default {
    inject: ['namespace', 'page'],

    props: {
      value: {
        type: Array,
        default: () => ([])
      }
    },

    computed: {
      examples () {
        return this.value.map(example => {
          const file = example === Object(example) ? example.file : example
          return {
            header: `${this.namespace}.${this.page}.examples.${file}.header`,
            desc: `${this.namespace}.${this.page}.examples.${file}.desc`
          }
        })
      }
    }
  }
</script>
