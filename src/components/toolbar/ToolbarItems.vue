<template lang="pug">
  ul(class="toolbar__items")
    template(v-for="item in items")
      v-toolbar-group(
        v-if="item.items"
        v-bind:group-class="groupClass"
        v-bind:item="item.parent"
        v-bind:items="item.items"
        v-bind:origin="item.parent.origin"
        v-bind:transition="item.parent.transition"
        v-bind:ripple="ripple"
        v-bind:router="router"
      )
      v-toolbar-item(
        v-else
        v-bind:item="item"
        v-bind:router="item.router || router"
        v-bind:ripple="item.ripple || ripple"
      )
    slot
</template>

<script>
  export default {
    name: 'toolbar-items',

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
