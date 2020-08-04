<template>
  <v-list
    dense
    expand
    nav
  >
    <template v-for="(item, i) in items">
      <app-title
        v-if="item.heading"
        :key="`heading-${i}`"
        :path="item.heading"
        class="pt-2 pb-1 px-2"
      />

      <v-divider
        v-else-if="item.divider"
        :key="`divider-${i}`"
        class="my-2 ml-2 mr-n2"
      />

      <default-list-group
        v-else-if="item.items"
        :key="`group-${i}`"
        :item="item"
      />

      <slot
        v-else-if="$scopedSlots.item"
        name="item"
        :index="i"
        :item="item"
      />

      <default-list-item
        v-else
        :key="`item-${i}`"
        :item="item"
      />
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'DefaultList',

    components: {
      DefaultListGroup: () => import('./ListGroup'),
      DefaultListItem: () => import('./ListItem'),
    },

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
