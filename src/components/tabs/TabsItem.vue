<template lang="pug">
  component(v-bind:is="computedTransition")
    div(
      class="tabs__item"
      v-bind:id="id"
      v-show="active"
    )
      slot
</template>

<script>
  import Eventable from '../../mixins/eventable'
  import { closestParentTag } from '../../util/helpers'

  export default {
    name: 'tabs-item',

    mixins: [Eventable],

    data () {
      return {
        active: false,
        reversing: false
      }
    },

    props: {
      id: {
        type: String,
        required: true
      },

      transition: {
        type: String,
        default: 'v-tab-transition'
      },

      reverseTransition: {
        type: String,
        default: 'v-tab-reverse-transition'
      }
    },

    computed: {
      computedTransition () {
        return this.reversing ? this.reverseTransition : this.transition
      },

      events () {
        return [
          [`tab:open:${this.tabsUid}`, this.open]
        ]
      },

      tabsUid () {
        const tabs = closestParentTag.call(this, 'v-tabs')

        return tabs ? tabs._uid : null
      }
    },

    methods: {
      open (target, reversing = false) {
        this.reversing = reversing
        this.active = this.id === target
      }
    }
  }
</script>