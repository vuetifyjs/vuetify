<template lang="pug">
  ul(class="sidebar__items")
    template(v-for="item in items")
      v-sidebar-group(v-if="item.items" v-bind:item="item.parent")
        v-sidebar-item(
          v-for="j in item.items"
          v-bind:item="j"
          v-bind:router="item.router || true"
        )
      v-sidebar-item(
        v-bind:item="item"
        v-bind:router="item.router || true"
        v-else
      )
    slot
</template>

<script>
  export default {
    name: 'sidebar-items',

    props: {
      items: {
        type: Array,
        default: () => []
      }
    }
  }
</script>