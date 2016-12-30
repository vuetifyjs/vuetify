<template lang="pug">
  li
    a(
      class="sidebar__item"
      v-if="!router && !item.router"
      v-bind:href="item.href"
      v-on:click="click"
    )
      template(v-if="item.icon")
        v-icon {{ item.icon }}
      span(v-text="item.text")
      slot
    router-link(
      class="sidebar__item"
      active-class="sidebar__item--active"
      v-bind:exact="item.href === '/'"
      v-bind:to="item.href"
      v-on:click.native="click"
      v-else
    )
      template(v-if="item.icon")
        v-icon {{ item.icon }}
      span(v-text="item.text")
      slot
</template>

<script>
  import { closest } from '../../util/helpers'
  import Itemable from '../../mixins/itemable'

  export default {
    name: 'sidebar-item',

    mixins: [Itemable],

    computed: {
      groupUid () {
        let group = closest.call(this, 'sidebar__group')

        return group ? group._uid : null
      },

      sidebarId () {
        let sidebar = closest.call(this, 'sidebar')

        return sidebar ? sidebar.id : null
      }
    },

    methods: {
      click () {
        this.$vuetify.bus.pub(`sidebar-group:close:${this.sidebarId}`, this.groupUid)
        this.$vuetify.bus.pub(`sidebar:item-clicked:${this.sidebarId}`)
      }
    }
  }
</script>