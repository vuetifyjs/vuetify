// Components
import { VExpandTransition } from '../transitions'
import { VIcon } from '../VIcon'
import VTreeview from './VTreeview'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'
import Colorable from '../../mixins/colorable'

// Utils
import mixins, { ExtractVue } from '../../util/mixins'
import { getObjectValueByPath, createRange } from '../../util/helpers'

// Types
import { VNode, VNodeChildren, PropType } from 'vue'
import { PropValidator } from 'vue/types/options'

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
  disablePerNode: Boolean,
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
  loadChildren: Function as PropType<(item: any) => Promise<void>>,
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
  selectionType: {
    type: String as PropType<'leaf' | 'independent'>,
    default: 'leaf',
    validator: (v: string) => ['leaf', 'independent'].includes(v),
  },
}

/* @vue/component */
const VTreeviewNode = baseMixins.extend<options>().extend({
  name: 'v-treeview-node',

  inject: {
    treeview: {
      default: null,
    },
  },

  props: {
    level: Number,
    item: {
      type: Object,
      default: () => null,
    } as PropValidator<Record<string, unknown> | null>,
    parentIsDisabled: Boolean,
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
    disabled (): boolean {
      return (
        getObjectValueByPath(this.item, this.itemDisabled) ||
        (!this.disablePerNode && (this.parentIsDisabled && this.selectionType === 'leaf'))
      )
    },
    key (): string {
      return getObjectValueByPath(this.item, this.itemKey)
    },
    children (): any[] | null {
      const children = getObjectValueByPath(this.item, this.itemChildren)
      return children && children.filter((child: any) => !this.treeview.isExcluded(getObjectValueByPath(child, this.itemKey)))
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
    genPrependSlot () {
      if (!this.$scopedSlots.prepend) return null

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__prepend',
      }, this.$scopedSlots.prepend(this.scopedProps))
    },
    genAppendSlot () {
      if (!this.$scopedSlots.append) return null

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__append',
      }, this.$scopedSlots.append(this.scopedProps))
    },
    genContent () {
      const children = [
        this.genPrependSlot(),
        this.genLabel(),
        this.genAppendSlot(),
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
          color: this.isSelected || this.isIndeterminate ? this.selectedColor : undefined,
          disabled: this.disabled,
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
          },
        },
      }, [this.computedIcon])
    },
    genLevel (level: number) {
      return createRange(level).map(() => this.$createElement('div', {
        staticClass: 'v-treeview-node__level',
      }))
    },
    genNode () {
      const children = [this.genContent()]

      if (this.selectable) children.unshift(this.genCheckbox())

      if (this.hasChildren) {
        children.unshift(this.genToggle())
      } else {
        children.unshift(...this.genLevel(1))
      }

      children.unshift(...this.genLevel(this.level))

      return this.$createElement('div', this.setTextColor(this.isActive && this.color, {
        staticClass: 'v-treeview-node__root',
        class: {
          [this.activeClass]: this.isActive,
        },
        on: {
          click: () => {
            if (this.openOnClick && this.hasChildren) {
              this.checkChildren().then(this.open)
            } else if (this.activatable && !this.disabled) {
              this.isActive = !this.isActive
              this.treeview.updateActive(this.key, this.isActive)
              this.treeview.emitActive()
            }
          },
        },
      }), children)
    },
    genChild (item: any, parentIsDisabled: boolean) {
      return this.$createElement(VTreeviewNode, {
        key: getObjectValueByPath(item, this.itemKey),
        props: {
          activatable: this.activatable,
          activeClass: this.activeClass,
          item,
          selectable: this.selectable,
          selectedColor: this.selectedColor,
          color: this.color,
          disablePerNode: this.disablePerNode,
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
          level: this.level + 1,
          selectionType: this.selectionType,
          parentIsDisabled,
        },
        scopedSlots: this.$scopedSlots,
      })
    },
    genChildrenWrapper () {
      if (!this.isOpen || !this.children) return null

      const children = [this.children.map(c => this.genChild(c, this.disabled))]

      return this.$createElement('div', {
        staticClass: 'v-treeview-node__children',
      }, children)
    },
    genTransition () {
      return this.$createElement(VExpandTransition, [this.genChildrenWrapper()])
    },
  },

  render (h): VNode {
    const children: VNodeChildren = [this.genNode()]

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
      },
      attrs: {
        'aria-expanded': String(this.isOpen),
      },
    }, children)
  },
})

export default VTreeviewNode
