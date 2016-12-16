<template lang="pug">
  li
    a(
      class="navbar__item"
      v-bind:href="item.href"
    )
      span(v-if="!item.icon" v-html="item.text")
      v-icon(v-else) {{ item.text }}
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