<template>
  <v-data-iterator
    :search="search"
    :items="computedItems"
    :pagination.sync="pagination"
    class="component-parameters container grid-list-md fluid pa-2"
    hide-actions
    content-tag="v-layout"
    content-class="wrap"
  >
    <template
      slot="item"
      slot-scope="{ item }"
    >
      <v-flex xs12>
        <div
          v-if="item.newIn"
          class="pt-2 pl-2 grey lighten-4 caption font-weight-bold primary--text"
        >
          New in — v{{ item.newIn }}
        </div>

        <div
          v-else-if="item.deprecatedIn"
          class="pt-2 pl-2 grey lighten-4 caption font-weight-bold error--text"
        >
          Deprecated in — v{{ item.deprecatedIn }}
        </div>

        <div class="pa-2 grey lighten-4 d-flex align-top">
          <v-flex
            v-for="header in headers"
            :class="[header.size ? `xs${header.size}` : 'shrink', `text-xs-${header.align}`]"
            :key="header.value"
          >
            <div
              class="header grey--text text--darken-1"
              v-text="genHeaderName(header.value, item)"
            />
            <div
              :class="['mono', header.value]"
              v-text="item[header.value]"
            />
          </v-flex>
        </div>

        <div class="pa-2 grey lighten-3 grey--text text--darken-2 d-flex">
          <v-flex>
            <helpers-markdown
              :source="item.description"
              class="justify"
            />
            <helpers-markup
              v-if="item.example"
              class="mt-2 mb-0"
              lang="ts"
            >{{ genTypescriptDef(item.example) }}</helpers-markup>
          </v-flex>
        </div>

      </v-flex>
    </template>
  </v-data-iterator>
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import { capitalize, camel } from '@/util/helpers'
  import componentNameMap from '@/data/i18n/componentNameMap'
  import { getObjectValueByPath } from 'vuetify/es5/util/helpers'

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
      ...mapState('app', ['deprecatedIn', 'newIn', 'removed']),
      computedItems () {
        const items = []

        for (const item of this.items) {
          const newItem = item !== Object(item)
            ? { name: item }
            : Object.assign({}, item)

          if (getObjectValueByPath(
            this.removed,
            `${this.type}.${this.target}.${newItem.name}`
          )) continue

          const keys = Object.keys(newItem)
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const fn = this[`gen${capitalize(key)}`]

            if (fn) {
              newItem[key] = fn(newItem[key], item)
            }
          }

          newItem.description = this.genDescription(item.name || item, item)
          newItem.newIn = getObjectValueByPath(
            this.newIn,
            `${this.type}.${this.target}.${newItem.name}`
          )

          newItem.deprecatedIn = getObjectValueByPath(
            this.deprecatedIn,
            `${this.type}.${this.target}.${newItem.name}`
          )

          if (!newItem.newIn && newItem.source) {
            newItem.newIn = getObjectValueByPath(
              this.newIn,
              `${this.type}.${newItem.source}.${newItem.name}`
            )
          }

          if (!newItem.deprecatedIn && newItem.source) {
            newItem.deprecatedIn = getObjectValueByPath(
              this.deprecatedIn,
              `${this.type}.${newItem.source}.${newItem.name}`
            )
          }

          items.push(newItem)
        }

        return items
      }
    },

    methods: {
      genDescription (name, item) {
        let description = ''
        let devPrepend = ''
        const camelSource = camel(item.source)

        const specialLevelDesc = `${this.namespace}.${this.type}.${this.target}['${name}']`
        const selfDesc = `${this.namespace}.${this.type}['${name}']`
        const mixinDesc = `Mixins.${camelSource}.${this.type}['${name}']`
        const componentDesc = `Components.${componentNameMap[item.source]}.${this.type}['${name}']`
        const genericDesc = `Generic.${capitalize(this.type)}['${name}']`

        if (this.$te(specialLevelDesc)) {
          description = this.$t(specialLevelDesc)

          if (description.indexOf('Mixins.') > -1) {
            description = this.$t(description)
          }

          devPrepend = `**SPECIAL (${item.source})** - `
        } else if (this.$te(selfDesc)) {
          description = this.$t(selfDesc)

          if (description.indexOf('Mixins.') > -1 ||
            description.indexOf('Components.') > -1
          ) {
            description = this.$t(description)
          }

          devPrepend = '**SELF** - '
        } else if (this.$te(mixinDesc)) {
          description = this.$t(mixinDesc)
          devPrepend = `**MIXIN (${item.source})** - `
        } else if (this.$te(componentDesc)) {
          description = this.$t(componentDesc)
          devPrepend = `**COMPONENT (${item.source})** - `
        } else if (this.$te(genericDesc)) {
          description = this.$t(genericDesc)
          devPrepend = `**GENERIC (${item.source})** - `
        } else {
          description = ''
          devPrepend = `**MISSING DESCRIPTION** - ${item.source}`
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

        return type.join(' | ')
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
