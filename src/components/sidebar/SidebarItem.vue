<template lang="pug">
  li
    a(
      class="sidebar__item"
      v-if="!router"
      v-bind:href="item.href"
      v-on:click="click()"
    )
      span(v-text="item.text")
    router-link(
      class="sidebar__item"
      active-class="sidebar__item--active"
      v-bind:exact="item.href === '/'"
      v-bind:to="item.href"
      v-on:click.native="click()"
      v-else
    )
      v-icon(v-if="item.icon") {{ item.icon }}
      span(v-text="item.text")
</template>

<script>
  export default {
    name: 'sidebar-item',
    
    props: {
      item: {
        type: Object,
        required: true
      },

      router: Boolean
    },

    methods: {
      click () {
        this.$vuetify.bus.pub('sidebar-group:close', this.$parent.$parent._uid, this.$parent._uid)
      }
    }
  }
</script>