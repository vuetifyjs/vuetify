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
        reverse: false
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
        return this.reverse ? this.reverseTransition : this.transition
      },

      events () {
        return [
          ['tabs', `${this.tabsUid}.active`, this.open]
        ]
      },

      tabsUid () {
        const tabs = closestParentTag.call(this, 'v-tabs')

        return tabs ? tabs._uid : null
      }
    },

    methods: {
      open (active) {
        this.reverse = active.reverse
        this.active = this.id === active.target
      }
    }
  }
</script>