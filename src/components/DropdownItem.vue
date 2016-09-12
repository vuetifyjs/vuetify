<template lang="pug">
  li
    a(
      class="dropdown__item"
      v-bind:href="item.href"
      v-html="item.text"
    )
</template>

<script>
  export default {
    name: 'dropdown-item',
    
    props: {
      item: {
        type: Object,
        required: true
      }
    }
  }
</script>