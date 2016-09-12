<template lang="pug">
  li
    a(
      class="sidebar__item"
      v-bind:href="item.href"
      v-html="item.text"
    )
</template>

<script>
  export default {
    name: 'sidebar-item',
    
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>