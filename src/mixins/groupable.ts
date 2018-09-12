import Vue from 'vue'

// Components
import VItemGroup from '../components/VItemGroup/VItemGroup'

// Mixins
import { inject as RegistrableInject } from './registrable'

// Utilities
import mixins from '../util/mixins'
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
      default (): string | undefined {
        if (!this.itemGroup) return undefined

        return this.itemGroup.activeClass
      }
    } as any as PropValidator<string>,
    disabled: Boolean,
    value: null as any as PropValidator<any>
  },

  data () {
    return {
      isActive: false
    }
  },

  computed: {
    groupClasses (): object {
      if (!this.activeClass) return {}

      return {
        [this.activeClass]: this.isActive
      }
    }
  },

  created () {
    this.itemGroup && this.itemGroup.register(this)
  },

  beforeDestroy () {
    this.itemGroup && this.itemGroup.unregister(this)
  },

  methods: {
    toggle () {
      this.$emit('change')
    }
  }
})
