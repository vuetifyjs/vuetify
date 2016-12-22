<template lang="pug">
  ul(class="navbar__items")
    v-navbar-item(
      v-bind:item="item"
      v-for="item in items"
      v-bind:router="item.router || false"
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
