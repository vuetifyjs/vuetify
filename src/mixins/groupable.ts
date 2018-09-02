import Vue from 'vue'

// Components
import VItemGroup from '../components/VItemGroup/VItemGroup'

// Mixins
import { inject as RegistrableInject } from './registrable'

// Utilities
import mixins from '../util/mixins'
import { consoleWarn } from '../util/console'
import { PropValidator } from 'vue/types/options'

type VItemGroupInstance = InstanceType<typeof VItemGroup>

interface options extends Vue {
  itemGroup: VItemGroupInstance
}

export default mixins<options>(
  RegistrableInject('itemGroup', 'v-item', 'v-item-group')
  /* @vue/component */
).extend({
  name: 'groupable',

  props: {
    activeClass: {
      type: String,
      default (): any {
        if (!this.itemGroup) return undefined

        return this.itemGroup.activeClass
      }
    },
    disabled: Boolean,
    value: null as any as PropValidator<any>
  },

  data: () => ({
    isActive: false
  }),

  computed: {
    groupClasses (): object {
      const activeClass = this.activeClass || this.itemGroup.activeClass
      if (!activeClass) return {}

      return {
        [activeClass]: this.isActive
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
    toggle (isActive?: boolean) {
      const oldVal = this.isActive
      if (typeof isActive === 'boolean') {
        this.isActive = isActive
      } else {
        this.isActive = !this.isActive
      }
      if (this.isActive !== oldVal) {
        this.$emit('change', this.isActive)
      }
    }
  }
})
