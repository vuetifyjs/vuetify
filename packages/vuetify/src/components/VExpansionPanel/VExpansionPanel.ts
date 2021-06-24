// Components
import VExpansionPanels from './VExpansionPanels'
import VExpansionPanelHeader from './VExpansionPanelHeader'
import VExpansionPanelContent from './VExpansionPanelContent'

// Mixins
import { factory as GroupableFactory } from '../../mixins/groupable'
import { provide as RegistrableProvide } from '../../mixins/registrable'

// Utilities
import { getSlot } from '../../util/helpers'
import mixins from '../../util/mixins'

// Types
import { VNode } from 'vue'

type VExpansionPanelHeaderInstance = InstanceType<typeof VExpansionPanelHeader>
type VExpansionPanelContentInstance = InstanceType<typeof VExpansionPanelContent>

export default mixins(
  GroupableFactory<'expansionPanels', typeof VExpansionPanels>('expansionPanels', 'v-expansion-panel', 'v-expansion-panels'),
  RegistrableProvide('expansionPanel', true)
  /* @vue/component */
).extend({
  name: 'v-expansion-panel',

  props: {
    disabled: Boolean,
    readonly: Boolean,
  },

  data () {
    return {
      content: null as VExpansionPanelContentInstance | null,
      header: null as VExpansionPanelHeaderInstance | null,
      nextIsActive: false,
    }
  },

  computed: {
    classes (): object {
      return {
        'v-expansion-panel--active': this.isActive,
        'v-expansion-panel--next-active': this.nextIsActive,
        'v-expansion-panel--disabled': this.isDisabled,
        ...this.groupClasses,
      }
    },
    isDisabled (): boolean {
      return this.expansionPanels.disabled || this.disabled
    },
    isReadonly (): boolean {
      return this.expansionPanels.readonly || this.readonly
    },
  },

  methods: {
    registerContent (vm: VExpansionPanelContentInstance) {
      this.content = vm
    },
    unregisterContent () {
      this.content = null
    },
    registerHeader (vm: VExpansionPanelHeaderInstance) {
      this.header = vm
      vm.$on('click', this.onClick)
    },
    unregisterHeader () {
      this.header = null
    },
    onClick (e: MouseEvent) {
      if (e.detail) this.header!.$el.blur()

      this.$emit('click', e)

      this.isReadonly || this.isDisabled || this.toggle()
    },
    toggle () {
      this.$nextTick(() => this.$emit('change'))
    },
  },

  render (h): VNode {
    return h('div', {
      staticClass: 'v-expansion-panel',
      class: this.classes,
      attrs: {
        'aria-expanded': String(this.isActive),
      },
    }, getSlot(this))
  },
})
