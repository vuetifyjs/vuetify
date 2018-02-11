<template lang="pug">
  v-data-iterator(
    :search="search"
    :items="computedItems"
    :pagination.sync="pagination"
    hide-actions
  ).component-parameters
    template(slot="item" slot-scope="{ item }")
      div(class="ma-2")
        div(class="pa-2 grey lighten-4 d-flex align-top")
          v-flex(
            v-for="header in headers"
            :class="[`xs${header.size}`, `text-xs-${header.align}`]"
            :key="header.value"
          )
            div(class="header grey--text text--darken-1") {{ genHeaderName(header.value, item) }}
            div(:class="['mono', header.value]") {{ item[header.value] }}
        div(class="pa-2 grey lighten-3 grey--text text--darken-2 d-flex")
          v-flex
            markdown(:source="item.description" class="justify")
            kbd(v-if="item.example" class="pa-2 d-flex mt-2 grey darken-2") {{ genTypescriptDef(item.example) }}

</template>

<script>
  import { capitalize, camel } from '@/util/helpers'

  export default {
    props: {
      target: {
        type: String,
        default: ''
      },
      headers: {
        type: Array,
        default: () => ([])
      },
      items: {
        type: Array,
        default: () => ([])
      },
      namespace: {
        type: String,
        default: ''
      },
      search: {
        type: String,
        default: ''
      },
      type: {
        type: String,
        default: ''
      }
    },

    data: () => ({
      pagination: {
        sortBy: 'name',
        rowsPerPage: -1
      }
    }),

    computed: {
      computedItems () {
        return this.items.map(item => {
          const newItem = item !== Object(item) ? { name: item } : Object.assign({}, item)

          const keys = Object.keys(newItem)
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const fn = this[`gen${capitalize(key)}`]

            if (fn) {
              newItem[key] = fn(newItem[key], item)
            }
          }

          newItem.description = this.genDescription(item.name || item, item)

          return newItem
        })
      }
    },

    methods: {
      genDescription (name, item) {
        let description = ''
        let devPrepend = ''
        const camelSource = camel(item.source)

        const specialLevelDesc = `${this.namespace}.${this.type}.${this.target}['${name}']`
        const componentLevelDesc = `${this.namespace}.${this.type}['${name}']`
        const mixinDesc = `Mixins.${camelSource}.${this.type}['${name}']`
        const genericDesc = `Generic.${capitalize(this.type)}['${name}']`

        if (this.$te(specialLevelDesc)) {
          description = this.$t(specialLevelDesc)

          if (description.indexOf('Mixins.') > -1) {
            description = this.$t(description)
          }

          devPrepend = '**SPECIAL** - '
        } else if (this.$te(componentLevelDesc)) {
          description = this.$t(componentLevelDesc)

          if (description.indexOf('Mixins.') > -1) {
            description = this.$t(description)
          }

          devPrepend = '**COMPONENT** - '
        } else if (this.$te(mixinDesc)) {
          description = this.$t(mixinDesc)
          devPrepend = '**MIXIN** - '
        } else if (this.$te(genericDesc)) {
          description = this.$t(genericDesc)
          devPrepend = '**GENERIC** - '
        } else {
          description = '**MISSING DESCRIPTION**'
        }

        const prepend = process.env.NODE_ENV === 'development' ? devPrepend : ''

        return `${prepend}${description}`
      },
      genName (name, item) {
        // This is so that camel-cased functions remain so in the API list
        if (item.signature) return name

        name = name || ''
        name = name.replace(/([A-Z])/g, (g) => `-${g[0].toLowerCase()}`)
        const sync = (item.sync && '.sync') || ''

        return `${name}${sync}`
      },
      genType (type) {
        type = Array.isArray(type) ? type : [type]

        return type.map(t => {
          return this.$t(`Generic.Types.${t}`)
        }).join(', ')
      },
      genProps (props) {
        if (!props) return '-'

        return this.genTypescriptDef(props)
      },
      genDefault (value) {
        if (typeof value !== 'string') return JSON.stringify(value)
        else return value
      },
      genTypescriptDef (obj) {
        return JSON.stringify(obj, null, 2).replace(/"(.*)":\s"(.*)",?/g, '$1: $2;')
      },
      genHeaderName (header, item) {
        let name = header
        if (header === 'default' && item.type === 'Function') name = 'signature'
        return this.$t(`Generic.Pages.${name}`)
      }
    }
  }
</script>

<style lang="stylus">
  .component-parameters
    code
      white-space: nowrap
      box-shadow: none

    p
      margin-bottom: 0

    .mono
      font-family: monospace
      font-weight: 900

    .header
      font-family: monospace
      font-size: 0.8rem

    .justify
      text-align: justify

    .name
      color: #bd4147

</style>
