<template>
  <v-list
    dense
    expand
    nav
  >
    <template v-for="(item, i) in items">
      <documentation-list-group
        v-if="item.items"
        :key="`group-${i}`"
        :item="item"
      />

      <documentation-list-item
        v-else
        :key="`item-${i}`"
        :item="item"
      />
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'DocumentationList',

    components: {
      DocumentationListGroup: () => import('./ListGroup'),
      DocumentationListItem: () => import('./ListItem'),
    },

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
