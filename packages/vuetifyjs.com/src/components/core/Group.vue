<template>
  <v-list-group
    :group="group"
    :prepend-icon="item.icon"
    :sub-group="subGroup"
    no-action
  >
    <core-item
      slot="activator"
      :text="item.text"
    />
    <template v-for="(child, i) in children">
      <core-sub-group
        v-if="child.group != null"
        :key="`sub-group-${i}`"
        :item="child"
      />
      <core-item
        v-else
        :icon="child.icon"
        :key="`item-${i}`"
        :to="child.to"
        :text="child.text"
        :chip="genChip(child)"
      />
    </template>
  </v-list-group>
</template>

<script>
  import kebabCase from 'lodash/kebabCase'

  export default {
    inheritAttrs: false,

    props: {
      item: {
        type: Object,
        default: () => ({
          text: '',
          group: '',
          children: []
        })
      },
      subGroup: {
        type: Boolean,
        default: false
      }
    },

    computed: {
      children () {
        return this.item.children.map(item => ({
          ...item,
          to: `${this.item.group}/${item.to}`
        }))
      },
      group () {
        return this.item.children.map(item => {
          return `${this.item.group}/${kebabCase(item.to)}`
        }).join('|')
      }
    },

    methods: {
      genChip (item) {
        if (item.new) return 'new'
        if (item.updated) return 'updated'
        if (item.deprecated) return 'deprecated'
      }
    }
  }
</script>
