<template>
  <v-list-group
    :group="group"
    :prepend-icon="item.icon"
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
      <default-list-sub-group
        v-if="child.items"
        :key="`sub-group-${i}`"
        :item="child"
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
  export default {
    name: 'DefaultListGroup',

    components: {
      DefaultListItem: () => import('./ListItem'),
      DefaultListSubGroup: () => import('./ListSubGroup'),
    },

    props: {
      item: {
        type: Object,
        default: () => ({}),
      },
    },

    computed: {
      group () {
        return this.genGroup(this.item.items)
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
    margin-bottom: 4px

    .v-list-group__header
      min-height: 32px

      > .v-list-item__icon
        margin-bottom: 6px
        margin-top: 6px
</style>
