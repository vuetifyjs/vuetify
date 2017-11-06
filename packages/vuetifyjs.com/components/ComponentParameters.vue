<template lang="pug">
  v-card.component-parameters
    v-card-title
      v-select(
        label="Component"
        hide-details
        single-line
        v-bind:items="components"
        v-model="currentComponent"
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
    v-data-table(
      v-bind:headers="headers"
      v-bind:search="search"
      v-bind:items="parsedItems"
      v-bind:pagination.sync="pagination"
    )
      template(slot="items" slot-scope="{ item }")
        td(
          v-for="(opt, i) in item"
          v-bind:key="i"
          v-html="opt"
        )
</template>

<script>
  export default {
    name: 'component-parameters',

    data () {
      return {
        currentComponent: Object.keys(this.items)[0],
        pagination: {
          rowsPerPage: 10
        },
        search: '',
        shared: {}
      }
    },

    props: {
      components: {
        type: Array,
        default: () => ([])
      },
      id: String,
      headers: {
        type: Array,
        default: () => ([])
      },
      items: {
        type: Object,
        default: () => ({})
      },
      namespace: String,
      type: String
    },

    computed: {
      parsedItems () {
        const items = this.items[this.currentComponent] || { props: [] }

        return items.props.map(item => {
          const def = item.default
          const type = this.$t(`Generic.Types.${item.type}`)
          let description = ''

          const specialLevelDesc = `Components.${this.namespace}.special.props.${this.currentComponent}.${item.name}`
          const componentLevelDesc = `Components.${this.namespace}.props.${item.name}`
          const genericDesc = `Generic.Props.${item.name}`
          if (this.$te(specialLevelDesc)) {
            description = this.$t(specialLevelDesc)
          } else if (this.$te(componentLevelDesc)) {
            description = this.$t(componentLevelDesc)
          } else if (this.$te(genericDesc)) {
            description = this.$t(genericDesc)
          }

          return {
            name: this.parseName(item.name),
            type,
            default: type === 'Boolean' && def === 'undefined' ? 'false' : def,
            description
          }
        })
      }
    },

    methods: {
      parseName (name) {
        name = name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)

        return `<code>${name}</code>`
      }
    }
  }
</script>

<style lang="stylus">
  .component-parameters
    box-shadow: none
    code
      white-space: nowrap
</style>
