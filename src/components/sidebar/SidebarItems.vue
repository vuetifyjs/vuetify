<template lang="pug">
  ul(class="sidebar__items")
    template(v-for="item in items")
      v-sidebar-item-header(v-if="item.header" v-html="item.header")
      v-sidebar-group(
        v-else-if="item.items"
        v-bind:item="item.parent"
        v-bind:items="item.items"
      )
      v-sidebar-item(
        v-else
        v-bind:item="item"
        v-bind:router="item.router"
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