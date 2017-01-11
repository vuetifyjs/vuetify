<template lang="pug">
  ul(class="sidebar__items")
    template(v-for="item in items")
      v-sidebar-item-header(v-if="item.header" v-html="item.header")
      v-sidebar-group(
        v-else-if="item.items"
        v-bind:group-class="groupClass"
        v-bind:item="item.parent"
        v-bind:items="item.items"
        v-bind:ripple="ripple"
        v-bind:router="router"
      )
      v-sidebar-item(
        v-else
        v-bind:item="item"
        v-bind:router="router || item.router === true"
        v-bind:ripple="ripple || item.ripple === true"
      )
    slot
</template>

<script>
  export default {
    name: 'sidebar-items',

    props: {
      groupClass: {
        type: String,
        default: ''
      },

      items: {
        type: Array,
        default: () => []
      },

      ripple: Boolean,

      router: Boolean
    }
  }
</script>