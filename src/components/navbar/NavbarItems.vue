<template lang="pug">
  ul(class="navbar__items")
    template(v-for="item in items")
      v-navbar-group(
        v-if="item.items"
        v-bind:item="item.parent"
        v-bind:items="item.items"
      )
      v-navbar-item(
        v-else
        v-bind:item="item"
        v-bind:router="item.router"
      )
      slot
</template>

<script>
  export default {
    name: 'navbar-items',

    props: {
      items: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
