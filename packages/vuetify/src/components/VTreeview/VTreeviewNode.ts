// Components
import { VExpandTransition } from '../transitions'
import { VIcon } from '../VIcon'
import VTreeview from './VTreeview'
import VTreeviewNode from './VTreeviewNode'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'
import Colorable from '../../mixins/colorable'

// Utils
import mixins, { ExtractVue } from '../../util/mixins'
import { getObjectValueByPath } from '../../util/helpers'
import { PropValidator } from 'vue/types/options'

// Types
import { VNode } from 'vue'

type VTreeViewInstance = InstanceType<typeof VTreeview>

const baseMixins = mixins(
  Colorable,
  RegistrableInject('treeview')
)

interface options extends ExtractVue<typeof baseMixins> {
  treeview: VTreeViewInstance
}

export const VTreeviewNodeProps = {
  activatable: Boolean,
  activeClass: {
    type: String,
    default: 'v-treeview-node--active',
  },
  color: {
    type: String,
    default: 'primary',
  },
  expandIcon: {
    type: String,
    default: '$subgroup',
  },
  indeterminateIcon: {
    type: String,
    default: '$checkboxIndeterminate',
  },
  itemChildren: {
    type: String,
    default: 'children',
  },
  itemDisabled: {
    type: String,
    default: 'disabled',
  },
  itemKey: {
    type: String,
    default: 'id',
  },
  itemText: {
    type: String,
    default: 'name',
  },
  loadChildren: Function as PropValidator<(item: any) => Promise<void>>,
  loadingIcon: {
    type: String,
    default: '$loading',
  },
  offIcon: {
    type: String,
    default: '$checkboxOff',
  },
  onIcon: {
    type: String,
    default: '$checkboxOn',
  },
  openOnClick: Boolean,
  rounded: Boolean,
  selectable: Boolean,
  selectedColor: {
    type: String,
    default: 'accent',
  },
  shaped: Boolean,
  transition: Boolean,
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-treeview-node',

  inject: {
    treeview: {
      default: null,
    },
  },

  props: {
    item: {
      type: Object,
      default: () => null,
    },
    ...VTreeviewNodeProps,
  },

  data: () => ({
    hasLoaded: false,
    isActive: false, // Node is selected (row)
    isIndeterminate: false, // Node has at least one selected child
    isLoading: false,
    isOpen: false, // Node is open/expanded
    isSelected: false, // Node is selected (checkbox)
  }),

  computed: {
    disabled (): string {
      return getObjectValueByPath(this.item, this.itemDisabled)
    },
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
        open: this.isOpen,
      }
    },
    computedIcon (): string {
      if (this.isIndeterminate) return this.indeterminateIcon
      else if (this.isSelected) return this.onIcon
      else return this.offIcon
    },
    hasChildren (): boolean {
      return !!this.children && (!!this.children.length || !!this.loadChildren)
    },
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
        staticClass: 'v-treeview-node__label',
      }, children)
    },
    genContent () {
      const children = [
        this.$scopedSlots.prepend && this.$scopedSlots.prepend(this.scopedProps),
        this.genLabel(),
        this.$scopedSlots.append && this.$scopedSlots.append(this.scopedProps),
      ]

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__content',
      }, children)
    },
    genToggle () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__toggle',
        class: {
          'v-treeview-node__toggle--open': this.isOpen,
          'v-treeview-node__toggle--loading': this.isLoading,
        },
        slot: 'prepend',
        on: {
          click: (e: MouseEvent) => {
            if (this.disabled) return

            e.stopPropagation()

            if (this.isLoading) return

            this.checkChildren().then(() => this.open())
          },
        },
      }, [this.isLoading ? this.loadingIcon : this.expandIcon])
    },
    genCheckbox () {
      return this.$createElement(VIcon, {
        staticClass: 'v-treeview-node__checkbox',
        props: {
          color: this.isSelected ? this.selectedColor : undefined,
        },
        on: {
          click: (e: MouseEvent) => {
            if (this.disabled) return

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
          },
        },
      }, [this.computedIcon])
    },
    genNode (): VNode {
      const children = [this.genContent()]

      if (this.selectable) children.unshift(this.genCheckbox())
      if (this.hasChildren) children.unshift(this.genToggle())

      return this.$createElement('div', this.setTextColor(this.isActive && this.color, {
        staticClass: 'v-treeview-node__root',
        class: {
          [this.activeClass]: this.isActive,
        },
        on: {
          click: () => {
            if (this.disabled) return

            if (this.openOnClick && this.hasChildren) {
              this.open()
            } else if (this.activatable) {
              this.isActive = !this.isActive
              this.treeview.updateActive(this.key, this.isActive)
              this.treeview.emitActive()
            }
          },
        },
      }), children)
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
          color: this.color,
          expandIcon: this.expandIcon,
          indeterminateIcon: this.indeterminateIcon,
          offIcon: this.offIcon,
          onIcon: this.onIcon,
          loadingIcon: this.loadingIcon,
          itemKey: this.itemKey,
          itemText: this.itemText,
          itemDisabled: this.itemDisabled,
          itemChildren: this.itemChildren,
          loadChildren: this.loadChildren,
          transition: this.transition,
          openOnClick: this.openOnClick,
          rounded: this.rounded,
          shaped: this.shaped,
        },
        scopedSlots: this.$scopedSlots,
      })
    },
    genChildrenWrapper (): any {
      if (!this.isOpen || !this.children) return null

      const children = [this.children.map(this.genChild)]

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children',
      }, children)
    },
    genTransition () {
      return this.$createElement(VExpandTransition, [this.genChildrenWrapper()])
    },
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
        'v-treeview-node--disabled': this.disabled,
        'v-treeview-node--rounded': this.rounded,
        'v-treeview-node--shaped': this.shaped,
        'v-treeview-node--selected': this.isSelected,
        'v-treeview-node--excluded': this.treeview.isExcluded(this.key),
      },
      attrs: {
        'aria-expanded': String(this.isOpen),
      },
    }, children)
  },
})
