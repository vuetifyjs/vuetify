<template>
  <v-list
    dense
    expand
    nav
  >
    <template v-for="(item, i) in items">
      <v-subheader
        v-if="item.heading"
        :key="`heading-${i}`"
        class="text--primary font-weight-black text-uppercase"
        v-text="item.heading"
      />

      <v-divider
        v-else-if="item.divider"
        :key="`divider-${i}`"
        class="mt-3 mb-2 ml-2 mr-n2"
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
  // Components
  import DefaultListGroup from './ListGroup'
  import DefaultListItem from './ListItem'

  export default {
    name: 'DefaultList',

    components: {
      DefaultListGroup,
      DefaultListItem,
    },

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
