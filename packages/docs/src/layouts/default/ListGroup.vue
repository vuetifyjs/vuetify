<template>
  <v-list-group
    v-model="model"
    :group="group"
    :prepend-icon="icon"
    append-icon="$mdiMenuDown"
    class="v-list-group--default"
    no-action
    v-bind="$attrs"
  >
    <template v-slot:activator>
      <v-list-item-content>
        <v-list-item-title
          v-if="item.title"
          v-text="item.title"
        />
      </v-list-item-content>
    </template>

    <template v-for="(child, i) in item.items">
      <v-subheader
        v-if="child.heading"
        :key="`heading-${i}`"
        class="text--primary font-weight-black text-uppercase"
        inset
        v-text="child.title"
      />

      <v-divider
        v-else-if="child.divider"
        :key="`divider-${i}`"
        inset
        class="mt-3 mb-2 ml-16"
      />

      <default-list-group
        v-else-if="child.items"
        :key="`sub-group-${i}`"
        :item="child"
        sub-group
      />

      <default-list-item
        v-else
        :key="`child-${i}`"
        :item="child"
      />
    </template>
  </v-list-group>
</template>

<script>
  // Components
  import DefaultListItem from './ListItem'
  import VListGroup from './VListGroup'

  export default {
    name: 'DefaultListGroup',

    components: {
      DefaultListItem,
      VListGroup,
    },

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },

    data: () => ({ model: null }),

    computed: {
      group () {
        return this.genGroup(this.item.items)
      },
      icon () {
        if (!this.item.icon) return undefined

        const [off, on] = this.item.icon.split(':')

        return this.model ? (on || off) : off
      },
    },

    methods: {
      genGroup (items) {
        return items.reduce((acc, cur) => {
          acc.push(
            cur.items
              ? this.genGroup(cur.items)
              : cur.to,
          )

          return acc
        }, []).join('|')
      },
    },
  }
</script>

<style lang="sass">
  .v-list-group.v-list-group--default
    .v-list-group__header
      min-height: 32px

      > .v-list-item__icon
        margin-bottom: 6px
        margin-top: 6px
</style>
