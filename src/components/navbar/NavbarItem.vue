<template lang="pug">
  li
    a(
      class="navbar__item"
      v-if="!router && !item.router"
      v-bind:href="item.href"
    )
      span(v-if="!item.icon" v-html="item.text")
      v-icon(v-else) {{ item.text }}
      slot
    router-link(
      class="navbar__item"
      active-class="navbar__item--active"
      v-bind:exact="item.href === '/'"
      v-bind:to="item.href"
      v-else
    )
      span(v-if="!item.icon" v-html="item.text")
      v-icon(v-else) {{ item.text }}
      slot
</template>

<script>
  import Itemable from '../../mixins/itemable'

  export default {
    name: 'navbar-item',

    mixins: [Itemable]
  }
</script>
