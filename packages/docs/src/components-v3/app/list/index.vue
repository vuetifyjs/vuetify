<template>
  <v-list
    dense
    expand
    nav
  >
    <template v-for="(item, i) in items">
      <v-list-subheader
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

      <app-list-group
        v-else-if="item.items"
        :key="`group-${i}`"
        :item="item"
      />

      <slot
        v-else-if="$slots.item"
        name="item"
        :index="i"
        :item="item"
      />

      <app-list-item
        v-else
        :key="`item-${i}`"
        :item="item"
      />
    </template>
  </v-list>
</template>

<script>
  export default {
    name: 'AppList',

    props: {
      items: {
        type: Array,
        default: () => ([]),
      },
    },
  }
</script>
