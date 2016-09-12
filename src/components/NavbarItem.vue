<template lang="pug">
  li
    a(
      class="navbar__item"
      v-bind:href="item.href"
      v-html="item.text"
    )
</template>

<script>
  export default {
    name: 'navbar-item',
    
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>