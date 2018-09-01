import Vue from 'vue'

// Components
import VItemGroup from '../components/VItemGroup'

// Mixins
import { inject as RegistrableInject } from './registrable'

// Utilities
import mixins from '../util/mixins'
import { consoleWarn } from '../util/console'

type VItemGroupInstance = InstanceType<typeof VItemGroup>

interface options extends Vue {
  itemGroup: VItemGroupInstance
}

export default mixins<options>(
  RegistrableInject('itemGroup')
).extend({
  name: 'groupable',

  props: {
    activeClass: String
  },

  data: () => ({
    isActive: false
  }),

  computed: {
    groupClasses (): object {
      if (!this.activeClass) return {}

      return {
        [this.activeClass]: this.isActive
      }
    }
  },

  created () {
    if (!('value' in this)) {
      consoleWarn('Implementing component is missing a value property', this)
    }

    this.itemGroup && this.itemGroup.register(this)
  },

  beforeDestroy () {
    this.itemGroup && this.itemGroup.unregister(this)
  },

  methods: {
    onClick (e: Event) {
      this.$emit('click', e)
    },
    toggle (isActive: boolean) {
      this.isActive = isActive
    }
  }
})
