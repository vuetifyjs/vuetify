<template>
  <div>
    <div
      v-if="missingItems.length > 0"
      class="px-2"
    >
      <strong>MISSING ITEMS:</strong>
      {{ missingItems.join(', ') }}
    </div>
    <v-data-iterator
      :search="search"
      :items="computedItems"
      :pagination.sync="pagination"
      class="component-parameters pa-2"
      hide-actions
      content-tag="v-layout"
      content-class="wrap"
    >
      <template
        slot="item"
        slot-scope="{ item }"
      >
        <v-flex xs12 grey lighten-2 mt-2>
          <v-layout wrap px-2 py-1>
            <v-flex
              v-for="(header, i) in headers"
              :class="header.class"
              :key="header.value"
            >
              <div
                class="header grey--text text--darken-2"
                v-text="genHeaderName(header.value, item)"
              />
              <div :class="['mono', header.value]">
                <span v-text="item[header.value]" />
                <template v-if="i === 0">
                  <v-chip
                    v-if="item.newIn"
                    class="v-chip--x-small"
                    dark
                    color="primary"
                  >
                    New in — v{{ item.newIn }}
                  </v-chip>
                  <v-chip
                    v-else-if="item.deprecatedIn"
                    class="v-chip--x-small"
                    dark
                    color="red lighten-3"
                  >
                    Deprecated in — v{{ item.deprecatedIn }}
                  </v-chip>
                </template>
              </div>
            </v-flex>
          </v-layout>
          <v-layout
            grey
            lighten-4
            pa-2
            wrap
          >
            <v-flex grey--text text--darken-3 xs12>
              <doc-markdown
                :code="item.description"
                class="justify"
              />
            </v-flex>
            <v-flex>
              <doc-markup
                v-if="item.example"
                class="mt-2 mb-0"
                lang="ts"
                value="example"
              >{{ genTypescriptDef(item.example) }}</doc-markup>
            </v-flex>
          </v-layout>
        </v-flex>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
  // Utilities
  import { mapState } from 'vuex'
  import { getObjectValueByPath } from 'vuetify/es5/util/helpers'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'
  import pluralize from 'pluralize'

  export default {
    inject: ['namespace', 'page'],

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
      ...mapState('documentation', ['deprecatedIn', 'newIn']),
      computedItems () {
        const items = []

        for (const item of this.items) {
          const newItem = item !== Object(item)
            ? { name: item }
            : Object.assign({}, item)

          const keys = Object.keys(newItem)
          for (let i = 0; i < keys.length; i++) {
            const key = keys[i]
            const fn = this[`gen${upperFirst(key)}`]

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

          if (newItem.deprecatedIn === false) continue

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
      },
      missingItems () {
        if (process.env.NODE_ENV !== 'development') return []

        return this.computedItems.filter(item => {
          return item.description.indexOf('MISSING DESCRIPTION') > -1
        }).map(item => item.name)
      }
    },

    methods: {
      isNested (str) {
        return (
          str.indexOf('Mixins.') > -1 ||
          str.indexOf('Components.') > -1
        )
      },
      genDescription (name, item) {
        let description = ''
        let devPrepend = ''
        const camelSource = this.parseSource(item.source)
        const composite = `${this.namespace}.${this.page}`

        // Components.Alerts.props['v-alert'].value
        const specialDesc = `${composite}.${this.type}['${this.target}']['${name}']`
        // Components.Inputs.props.value
        const componentDesc = `${this.namespace}.${camelSource}.${this.type}['${name}']`
        // Components.Alerts.props.value
        const selfDesc = `${composite}.${this.type}['${name}']`
        // Mixins.Bootable.props.value
        const mixinDesc = `Mixins.${camelSource}.${this.type}['${name}']`
        // Generic.Props.value
        const genericDesc = `Generic.${upperFirst(this.type)}['${name}']`

        if (this.$te(specialDesc)) {
          description = this.$t(specialDesc)
          devPrepend = `**SPECIAL (${item.source})** - `
        } else if (this.$te(componentDesc)) {
          description = this.$t(componentDesc)
          devPrepend = `**COMPONENT (${item.source})** - `
        } else if (this.$te(selfDesc)) {
          description = this.$t(selfDesc)
          devPrepend = `**SELF** - `
        } else if (this.$te(mixinDesc)) {
          description = this.$t(mixinDesc)
          devPrepend = `**MIXIN (${item.source})** - `
        } else if (this.$te(genericDesc)) {
          description = this.$t(genericDesc)
          devPrepend = `**GENERIC (${item.source})** - `
        } else {
          description = ''
          devPrepend = `**MISSING DESCRIPTION** - ${item.source}`
        }

        if (this.isNested(description)) {
          description = this.$t(description)
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
        return JSON.stringify(obj, null, 2).replace(/"(.*)":\s"(.*)",?/g, '$1: $2')
      },
      genHeaderName (header, item) {
        let name = header
        if (header === 'default' && item.type === 'Function') name = 'signature'
        return this.$t(`Generic.Pages.${name}`)
      },
      parseSource (source) {
        if (!source) return ''

        if (source.match(/^v-/)) {
          source = pluralize(source.replace(/v-/, ''))
        }

        return upperFirst(camelCase(source))
      }
    }
  }
</script>

<style lang="stylus">
  .component-parameters
    p
      margin-bottom: 0

    .mono
      font-family: 'Roboto Mono', monospace
      font-weight: 900

    .header
      font-family: 'Roboto Mono', monospace
      font-size: 0.8rem

    .justify
      text-align: justify

    .name
      color: #bd4147

</style>
