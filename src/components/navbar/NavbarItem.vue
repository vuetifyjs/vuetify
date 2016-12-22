<template lang="pug">
  li
    a(
      class="navbar__item"
      v-if="!router"
      v-bind:href="item.href"
    )
      span(v-if="!item.icon" v-html="item.text")
      v-icon(v-else) {{ item.text }}
    router-link(
      class="navbar__item"
      v-bind:to="item.href"
      v-else
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
      },
      router: Boolean
    }
  }
</script>
