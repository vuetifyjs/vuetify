<template lang="pug">
  ul(class="navbar__items")
    template(v-for="item in items")
      v-navbar-group(
        v-if="item.items"
        v-bind:group-class="groupClass"
        v-bind:item="item.parent"
        v-bind:items="item.items"
        v-bind:origin="item.parent.origin"
        v-bind:transition="item.parent.transition"
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
      groupClass: {
        type: String,
        default: ''
      },

      items: {
        type: Array,
        default: () => []
      }
    }
  }
</script>
