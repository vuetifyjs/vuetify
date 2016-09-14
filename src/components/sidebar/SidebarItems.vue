<template lang="pug">
  ul(
    class="sidebar__items"
  )
    v-sidebar-item(
      v-bind:item="item"
      v-for="item in items"
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