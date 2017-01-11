<template lang="pug">
  div(
    class="collapsible__header"
    v-bind:class="classes"
    v-on:click="click"
  )
    slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import { closestParentTag } from '../../util/helpers'

  export default {
    name: 'collapsible-header',

    mixins: [Eventable],

    data () {
      return {
        active: false
      }
    },

    computed: {
      classes () {
        return {
          'collapsible__header--active': this.active
        }
      },

      events () {
        return [
          [`collapse:opened:${this.rootId}`, this.opened],
          [`collapse:closed:${this.rootId}`, this.closed]
        ]
      },

      rootId () {
        let root = closestParentTag.call(this, 'v-collapsible')

        return root ? root._uid : null
      },

      bodySiblingUid () {
        return Number(this.getNextSibling(this.$el).getAttribute('uid'))
      }
    },

    methods: {
      click () {
        this.$vuetify.bus.pub(`collapse:toggle:${this.rootId}`, this.bodySiblingUid)
      },
      
      getNextSibling (el) {
        if (!(el = el.nextSibling)) return null
        
        while (el.nodeType != 1) {
          if (!(el = el.nextSibling)) return null
        }
      
        return el
      },

      opened (uid) {
        this.active = this.bodySiblingUid !== uid ? this.active : true
      },

      closed (uid) {
        this.active = this.bodySiblingUid !== uid ? this.active : false
      }
    }
  }
</script>