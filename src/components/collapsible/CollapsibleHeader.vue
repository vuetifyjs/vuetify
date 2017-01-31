<template lang="pug">
  div(
    class="collapsible__header"
    v-bind:class="classes"
    v-on:click.stop="click"
  )
    slot
</template>

<script>
  import { closestParentTag } from '../../util/helpers'

  export default {
    name: 'collapsible-header',

    data () {
      return {
        active: false
      }
    },

    computed: {
      bodySiblingUid () {
        return Number(this.getNextSibling(this.$el).getAttribute('uid'))
      },

      classes () {
        return {
          'collapsible__header--active': this.active
        }
      },

      rootId () {
        const root = closestParentTag.call(this, 'v-collapsible')

        return root ? root._uid : null
      }
    },

    methods: {
      click () {
      },

      getNextSibling (el) {
        if (!(el = el.nextSibling)) return null

        while (el.nodeType !== 1) {
          if (!(el = el.nextSibling)) return null
        }

        return el
      },

      toggle (parent) {
        this.active = parent.items.includes(this.bodySiblingUid)
      }
    }
  }
</script>