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
      :items="computedItems"
      :items-per-page="-1"
      :search="search"
      class="component-parameters"
      hide-default-footer
      sort-by="name"
    >
      <template v-slot="{ items }">
        <div>
          <template v-for="(item, i) in items">
            <doc-api-item
              :key="item.name"
              :headers="headers"
              :item="item"
            />

            <v-divider
              v-if="i + 1!== items.length"
              :key="`divider-${i}`"
            />
          </template>
        </div>
      </template>

      <template v-slot:no-results>
        <div class="text-center pa-6 title font-weight-regular">No matching records found</div>
      </template>
    </v-data-iterator>
  </div>
</template>

<script>
  // Utilities
  import {
    mapState,
  } from 'vuex'
  import { getObjectValueByPath } from 'vuetify/es5/util/helpers'
  import camelCase from 'lodash/camelCase'
  import upperFirst from 'lodash/upperFirst'
  import pluralize from 'pluralize'

  export default {
    name: 'DocParameters',

    inject: {
      overrideNamespace: {
        default: null,
      },
      overridePage: {
        default: null,
      },
    },

    props: {
      target: {
        type: String,
        default: '',
      },
      headers: {
        type: Array,
        default: () => ([]),
      },
      lang: {
        type: String,
        default: '',
      },
      items: {
        type: Array,
        default: () => ([]),
      },
      search: {
        type: String,
        default: '',
      },
      type: {
        type: String,
        default: '',
      },
    },

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
      },
      namespace () {
        return this.overrideNamespace || this.$store.getters['documentation/namespace']
      },
      page () {
        return this.overridePage || this.$store.getters['documentation/page']
      },
    },

    methods: {
      isNested (str) {
        return (
          str.indexOf('Mixins.') > -1 ||
          str.indexOf('Components.') > -1
        )
      },
      /* eslint-disable-next-line max-statements */
      genDescription (name, item, namespace = this.namespace, page = this.page) {
        let description = ''
        let devPrepend = ''
        const camelSource = this.parseSource(item.source)
        if (this.lang) page = upperFirst(camelCase(this.lang))
        const composite = `${this.namespace}.${page}`

        // Components.Alerts.props['v-alert'].value
        const specialDesc = `${composite}.${this.type}['${this.target}']['${name}']`
        // Components.Inputs.props.value
        const componentDesc = `${this.namespace}.${camelSource}.${this.type}['${name}']`
        // Components.Inputs.props.inputs.value
        const componentNestedDesc = `${this.namespace}.${camelSource}.${this.type}['${item.source}']['${name}']`
        // Components.Alerts.props.value
        const selfDesc = `${composite}.${this.type}['${name}']`
        // Mixins.Bootable.props.value
        const mixinDesc = `Mixins.${camelSource}.${this.type}['${name}']`
        // Generic.Props.value
        const genericDesc = `Generic.${upperFirst(this.type)}['${name}']`
        // api['v-btn'] = 'Components.Buttons'
        const apiDesc = `${composite}.api['${this.target}']`

        if (this.$te(specialDesc, 'en')) {
          description = this.$t(specialDesc)
          devPrepend = `**SPECIAL (${item.source})** - `
        } else if (this.$te(componentDesc, 'en')) {
          description = this.$t(componentDesc)
          devPrepend = `**COMPONENT (${item.source})** - `
        } else if (this.$te(componentNestedDesc, 'en')) {
          description = this.$t(componentNestedDesc)
          devPrepend = `**COMPONENT NESTED (${item.source})** - `
        } else if (this.$te(selfDesc, 'en')) {
          description = this.$t(selfDesc)
          devPrepend = `**SELF** - `
        } else if (this.$te(mixinDesc, 'en')) {
          description = this.$t(mixinDesc)
          devPrepend = `**MIXIN (${item.source})** - `
        } else if (this.$te(genericDesc, 'en')) {
          description = this.$t(genericDesc)
          devPrepend = `**GENERIC (${item.source})** - `
        } else if (this.$te(apiDesc, 'en')) {
          const [namespace, page] = this.$t(apiDesc).split('.')

          return this.genDescription(name, item, namespace, page)
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
        name = name.replace(/([A-Z])/g, g => `-${g[0].toLowerCase()}`)
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
      genValue (value) {
        if (typeof value === 'string') return value

        return this.genTypescriptDef(value)
      },
      genExample (example) {
        return this.genTypescriptDef(example)
      },
      genDefault (value) {
        if (typeof value !== 'string') return JSON.stringify(value)
        else return value
      },
      genTypescriptDef (obj) {
        return JSON.stringify(obj, null, 2).replace(/"(.*)":\s"(.*)",?/g, '$1: $2').replace(/"(.*)":\s\{/g, '$1: {')
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
      },
    },
  }
</script>

<style lang="sass">
.component-parameters
  font-size: 14px

  p
    margin-bottom: 0

  .mono
    font-family: 'Roboto Mono', monospace
    font-weight: 500

  .header
    font-family: 'Roboto Mono', monospace
    font-size: 0.8rem

  .justify
    text-align: justify

  .name
    color: #bd4147
</style>
