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
  import { capitalize, uppercase } from '@/util/helpers'

  export default {
    data () {
      return {
        currentComponent: this.components[0],
        pagination: {
          rowsPerPage: 10
        },
        search: '',
        shared: {}
      }
    },

    props: {
      api: {
        type: Object,
        default: () => ({})
      },
      components: {
        type: Array,
        default: () => ([])
      },
      id: String,
      headers: {
        type: Array,
        default: () => ([])
      },
      namespace: String,
      type: String
    },

    computed: {
      extra () {
        const component = capitalize(this.$route.params.component)
        const section = capitalize(this.$route.params.section)
        const props = `${section}.${component}.extra`

        return this.$te(props)
          ? this.$t(props)[0]
          : {}
      },
      items () {
        const component = this.api[this.currentComponent] || {
          props: [],
          slots: [],
          scopedSlots: []
        }

        let items = component[this.type] || []

        if (this.type === 'slots' && component.scopedSlots) {
          items = items.concat(component.scopedSlots)
        }

        const extra = this.extra[this.currentComponent]
        if (extra && extra[this.type]) {
          items = items.concat(extra[this.type])
        }

        return items
      },
      parsedItems () {
        return this[`gen${this.type}`]()
      }
    },

    methods: {
      genDefault () {
        return Object.assign({}, {
          props: [],
          slots: []
        })
      },
      genDescription (item) {
        let description = ''
        const specialLevelDesc = `Components.${this.namespace}.special.${this.type}.${this.currentComponent}.${item.name}`
        const componentLevelDesc = `Components.${this.namespace}.${this.type}.${item.name}`
        const genericDesc = `Generic.${this.uppercase(this.type)}.${item.name}`

        if (this.$te(specialLevelDesc)) {
          description = this.$t(specialLevelDesc)
        } else if (this.$te(componentLevelDesc)) {
          description = this.$t(componentLevelDesc)
        } else if (this.$te(genericDesc)) {
          description = this.$t(genericDesc)
        }

        return description
      },
      genprops () {
        return this.items.map(item => {
          return {
            name: this.genName(item.name),
            type: this.genType(item.type),
            default: item.default,
            description: this.genDescription(item)
          }
        })
      },
      genslots () {
        return this.items.map(item => {
          return {
            name: this.genName((item || '').slice()),
            description: this.genDescription({
              name: item
            })
          }
        })
      },
      genName (name) {
        name = name || ''
        name = name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)

        return `<code>${name}</code>`
      },
      genType (type) {
        type = Array.isArray(type) ? type : [type]

        return type.map(t => {
          return this.$t(`Generic.Types.${t}`)
        }).join(', ')
      },
      uppercase (str) {
        str = str || ''

        return str.substr(0, 1).toUpperCase() + str.slice(1)
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
