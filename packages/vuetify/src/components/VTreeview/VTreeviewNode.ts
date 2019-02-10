// Components
import { VExpandTransition } from '../transitions'
import { VIcon } from '../VIcon'
import VTreeview from './VTreeview'
import VTreeviewNode from './VTreeviewNode'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'

// Utils
import mixins from '../../util/mixins'
import { getObjectValueByPath } from '../../util/helpers'
import { PropValidator } from 'vue/types/options'

// Types
import Vue, { VNode } from 'vue'

type VTreeViewInstance = InstanceType<typeof VTreeview>

interface options extends Vue {
  treeview: VTreeViewInstance
}

export const VTreeviewNodeProps = {
  activatable: Boolean,
  activeClass: {
    type: String,
    default: 'v-treeview-node--active'
  },
  selectable: Boolean,
  selectedColor: {
    type: String,
    default: 'accent'
  },
  indeterminateIcon: {
    type: String,
    default: '$vuetify.icons.checkboxIndeterminate'
  },
  onIcon: {
    type: String,
    default: '$vuetify.icons.checkboxOn'
  },
  offIcon: {
    type: String,
    default: '$vuetify.icons.checkboxOff'
  },
  expandIcon: {
    type: String,
    default: '$vuetify.icons.subgroup'
  },
  loadingIcon: {
    type: String,
    default: '$vuetify.icons.loading'
  },
  itemKey: {
    type: String,
    default: 'id'
  },
  itemText: {
    type: String,
    default: 'name'
  },
  itemChildren: {
    type: String,
    default: 'children'
  },
  loadChildren: Function as PropValidator<(item: any) => Promise<void>>,
  openOnClick: Boolean,
  transition: Boolean
}

export default mixins<options>(
  RegistrableInject('treeview')
  /* @vue/component */
).extend({
  name: 'v-treeview-node',

  inject: {
    treeview: {
      default: null
    }
  },

  props: {
    item: {
      type: Object,
      default: () => null
    },
    ...VTreeviewNodeProps
  },

  data: () => ({
    isOpen: false, // Node is open/expanded
    isSelected: false, // Node is selected (checkbox)
    isIndeterminate: false, // Node has at least one selected child
    isActive: false, // Node is selected (row)
    isLoading: false,
    hasLoaded: false
  }),

  computed: {
    key (): string {
      return getObjectValueByPath(this.item, this.itemKey)
    },
    children (): any[] | null {
      return getObjectValueByPath(this.item, this.itemChildren)
    },
    text (): string {
      return getObjectValueByPath(this.item, this.itemText)
    },
    scopedProps (): object {
      return {
        item: this.item,
        leaf: !this.children,
        selected: this.isSelected,
        indeterminate: this.isIndeterminate,
        active: this.isActive,
        open: this.isOpen
      }
    },
    computedIcon (): string {
      if (this.isIndeterminate) return this.indeterminateIcon
      else if (this.isSelected) return this.onIcon
      else return this.offIcon
    },
    hasChildren (): boolean {
      return !!this.children && (!!this.children.length || !!this.loadChildren)
    }
  },

  created () {
    this.treeview.register(this)
  },

  beforeDestroy () {
    this.treeview.unregister(this)
  },

  methods: {
    checkChildren (): Promise<void> {
      return new Promise<void>(resolve => {
        // TODO: Potential issue with always trying
        // to load children if response is empty?
        if (!this.children || this.children.length || !this.loadChildren || this.hasLoaded) return resolve()

        this.isLoading = true
        resolve(this.loadChildren(this.item))
      }).then(() => {
        this.isLoading = false
        this.hasLoaded = true
      })
    },
    open () {
      this.isOpen = !this.isOpen
      this.treeview.updateOpen(this.key, this.isOpen)
      this.treeview.emitOpen()
    },
    genLabel () {
      const children = []

      if (this.$scopedSlots.label) children.push(this.$scopedSlots.label(this.scopedProps))
      else children.push(this.text)

      return this.$createElement('div', {
        slot: 'label',
        staticClass: 'v-treeview-node__label'
      }, children)
    },
    genContent () {
      const children = [
        this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps),
        this.genLabel(),
        this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps)
      ]

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__content'
      }, children)
    },
    genToggle () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__toggle',
        class: {
          'v-treeview-node__toggle--open': this.isOpen,
          'v-treeview-node__toggle--loading': this.isLoading
        },
        slot: 'prepend',
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()

            if (this.isLoading) return

            this.checkChildren().then(() => this.open())
          }
        }
      }, [this.isLoading ? this.loadingIcon : this.expandIcon])
    },
    genCheckbox () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__checkbox',
        props: {
          color: this.isSelected ? this.selectedColor : undefined
        },
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()

            if (this.isLoading) return

            this.checkChildren().then(() => {
              // We nextTick here so that items watch in VTreeview has a chance to run first
              this.$nextTick(() => {
                this.isSelected = !this.isSelected
                this.isIndeterminate = false

                this.treeview.updateSelected(this.key, this.isSelected)
                this.treeview.emitSelected()
              })
            })
          }
        }
      }, [this.computedIcon])
    },
    genNode (): VNode {
      const children = [this.genContent()]

      if (this.selectable) children.unshift(this.genCheckbox())
      if (this.hasChildren) children.unshift(this.genToggle())

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__root',
        class: {
          [this.activeClass]: this.isActive
        },
        on: {
          click: () => {
            if (this.openOnClick && this.children) {
              this.open()
            } else if (this.activatable) {
              this.isActive = !this.isActive
              this.treeview.updateActive(this.key, this.isActive)
              this.treeview.emitActive()
            }
          }
        }
      }, children)
    },
    genChild (item: any): VNode {
      return this.$createElement(VTreeviewNode, {
        key: getObjectValueByPath(item, this.itemKey),
        props: {
          activatable: this.activatable,
          activeClass: this.activeClass,
          item,
          selectable: this.selectable,
          selectedColor: this.selectedColor,
          expandIcon: this.expandIcon,
          indeterminateIcon: this.indeterminateIcon,
          offIcon: this.offIcon,
          onIcon: this.onIcon,
          loadingIcon: this.loadingIcon,
          itemKey: this.itemKey,
          itemText: this.itemText,
          itemChildren: this.itemChildren,
          loadChildren: this.loadChildren,
          transition: this.transition,
          openOnClick: this.openOnClick
        },
        scopedSlots: this.$scopedSlots
      })
    },
    genChildrenWrapper (): any {
      if (!this.isOpen || !this.children) return null

      const children = [this.children.map(this.genChild)]

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children'
      }, children)
    },
    genTransition () {
      return this.$createElement(VExpandTransition, [this.genChildrenWrapper()])
    }
  },

  render (h): VNode {
    const children = [this.genNode()]

    if (this.transition) children.push(this.genTransition())
    else children.push(this.genChildrenWrapper())

    return h('div', {
      staticClass: 'v-treeview-node',
      class: {
        'v-treeview-node--leaf': !this.hasChildren,
        'v-treeview-node--click': this.openOnClick,
        'v-treeview-node--selected': this.isSelected,
        'v-treeview-node--excluded': this.treeview.isExcluded(this.key)
      }
    }, children)
  }
})
