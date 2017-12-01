<template lang="pug">
  v-data-table(
    :headers="headers"
    :search="search"
    :items="computedItems"
    :pagination.sync="pagination"
  ).component-parameters
    template(slot="items" slot-scope="{ item }")
      td(
        v-for="(opt, i) in item"
        :key="i"
      )
        markdown(:source="opt")
</template>

<script>
  import { capitalize } from '@/util/helpers'

  export default {
    data: () => ({
      pagination: {
        rowsPerPage: 10
      }
    }),

    props: {
      target: String,
      headers: {
        type: Array,
        default: () => ([])
      },
      items: {
        type: Array,
        default: () => ([])
      },
      namespace: String,
      search: String,
      type: String
    },

    computed: {
      computedItems () {
        return this.items.map(item => {
          const newItem = {}

          if (item !== Object(item)) {
            item = { name: item }
          }

          Object.keys(item).map(key => {
            const fn = this[`gen${capitalize(key)}`]

            if (fn) {
              newItem[key] = fn(item[key])
            } else {
              newItem[key] = item[key]
            }
          })

          newItem.desc = item.desc || this.genDescription(item.name)

          return newItem
        })
      }
    },

    methods: {
      genDescription (name) {
        let description = ''
        const specialLevelDesc = `Components.${this.namespace}.special.${this.type}.${this.target}.${name}`
        const componentLevelDesc = `Components.${this.namespace}.${this.type}.${name}`
        const genericDesc = `Generic.${capitalize(this.type)}.${name}`

        if (this.$te(specialLevelDesc)) {
          description = this.$t(specialLevelDesc)
        } else if (this.$te(componentLevelDesc)) {
          description = this.$t(componentLevelDesc)
        } else if (this.$te(genericDesc)) {
          description = this.$t(genericDesc)
        }

        return description
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
      }
    }
  }
</script>

<style lang="stylus">
  .component-parameters
    code
      white-space: nowrap

    p
      margin-bottom: 0
</style>
