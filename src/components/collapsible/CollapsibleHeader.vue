<template lang="pug">
  div(
    class="collapsible__header"
    v-bind:class="classes"
    v-on:click.stop="click"
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
      bodySiblingUid () {
        return Number(this.getNextSibling(this.$el).getAttribute('uid'))
      },

      classes () {
        return {
          'collapsible__header--active': this.active
        }
      },

      events () {
        return [
          ['collapsible', this.rootId, this.toggle, { deep: true }]
        ]
      },

      rootId () {
        const root = closestParentTag.call(this, 'v-collapsible')

        return root ? root._uid : null
      }
    },

    methods: {
      click () {
        this.$vuetify().event('component toggle', {
          bodyId: this.bodySiblingUid,
          component: 'collapsible',
          id: this.rootId
        })
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