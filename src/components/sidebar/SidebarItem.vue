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
  import { closest } from '../../util/helpers'

  export default {
    name: 'sidebar-item',
    
    data () {
      return {
        sidebar: null,
        group: null
      }
    },

    props: {
      item: {
        type: Object,
        required: true
      },

      router: Boolean
    },

    computed: {
      group () {
        return closest.call(this, 'sidebar__group')
      },

      sidebar () {
        return closest.call(this, 'sidebar')
      }
    },

    methods: {
      click () {
        this.$vuetify.bus.pub(`sidebar-group:close:${this.sidebar}`, this.group)
      }
    }
  }
</script>