<template lang="pug">
  ul(class="sidebar__items")
    template(v-for="item in items")
      v-sidebar-item-header(v-if="item.header" v-html="item.header")
      v-sidebar-group(v-if="item.items" v-bind:item="item.parent")
        v-sidebar-item(
          v-for="child in item.items"
          v-bind:item="child"
          v-bind:router="item.router"
          v-if="child.href"
        )
      v-sidebar-item(
        v-bind:item="item"
        v-bind:router="item.router"
        v-else-if="item.href"
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