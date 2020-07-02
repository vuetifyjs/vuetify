// Components
import { VExpandTransition } from '../transitions'
import { VIcon } from '../VIcon'
import VTreeview from './VTreeview'

// Mixins
import { inject as RegistrableInject } from '../../mixins/registrable'
import Colorable from '../../mixins/colorable'

// Utils
import mixins, { ExtractVue } from '../../util/mixins'
import { getObjectValueByPath, createRange, keyCodes } from '../../util/helpers'

// Types
import { VNode, PropType } from 'vue'

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
    },
    parentIsDisabled: Boolean,
    ...VTreeviewNodeProps,
  },

  data: () => ({
    hasLoaded: false,
    isActive: false, // Node is selected (row)
    isIndeterminate: false, // Node has at least one selected child
    isLoading: false,
    isOpen: false, // Node is open/expanded
    isSelected: false, // Node is selected (checkbox),
    tabindex: -1,
  }),

  computed: {
    ariaControls (): string | null {
      return this.children ? `${this.htmlId}-child` : null
    },
    ariaExpanded (): string | null {
      return this.children ? String(this.isOpen) : null
    },
    ariaPopup (): string | null {
      return this.children ? 'true' : null
    },
    disabled (): boolean {
      return (
        getObjectValueByPath(this.item, this.itemDisabled) ||
        (this.parentIsDisabled && this.selectionType === 'leaf')
      )
    },
    htmlId (): string {
      return `nodeitem-${this.key}`
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
  watch: {
    tabindex (): void {
      if (this.tabindex === 0) {
        (this.$refs.treeviewnode as HTMLElement).focus()
      }
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
        attrs: {
          id: `label-${this.htmlId}`,
        },
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
        attrs: {
          'aria-control': this.ariaControls,
          'aria-expanded': String(this.isOpen),
        },
        slot: 'prepend',
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()

            if (this.isLoading) return

            this.checkChildren().then(() => {
              this.open()
              this.$nextTick(function () {
                this.updateScroll(e.currentTarget)
              })
            })
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
    genNode (): VNode {
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
        attrs: {
          'aria-control': this.ariaControls,
          id: this.htmlId,
        },
        on: {
          click: (event: Event) => {
            if (this.openOnClick && this.hasChildren) {
              this.checkChildren().then(this.open)
              this.$nextTick(function () {
                this.updateScroll(event.currentTarget)
              })
            } else if (this.activatable && !this.disabled) {
              this.isActive = !this.isActive
              this.treeview.updateActive(this.key, this.isActive)
              this.treeview.emitActive()
            }
          },
        },
      }), children)
    },
    genChild (item: any, parentIsDisabled: boolean): VNode {
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
          level: this.level + 1,
          selectionType: this.selectionType,
          parentIsDisabled,
        },
        scopedSlots: this.$scopedSlots,
      })
    },
    genChildrenWrapper (): any {
      if (!this.isOpen || !this.children) return null

      const children = [this.children.map(c => this.genChild(c, this.disabled))]

      return this.$createElement('div', { // ul
        attrs: {
          'aria-labeledby': this.htmlId,
          id: this.ariaControls,
          tabindex: -1,
          role: 'group',
        },
        staticClass: 'v-treeview-node__children',
      }, children)
    },
    genTransition () {
      return this.$createElement(VExpandTransition, [this.genChildrenWrapper()])
    },
    handleFocus (event: Event): void {
      if (event.target) {
        this.treeview.updateFocus(this.key, event.type === 'focus')
      }
    },
    handkeKey (event: KeyboardEvent): void {
      const moveDown = (event: KeyboardEvent) => {
        this.treeview.keyMoveDown(this.key)
        event.stopPropagation()
      }
      const moveUp = (event: KeyboardEvent) => {
        this.treeview.keyMoveUp(this.key)
        event.stopPropagation()
      }
      const moveLeft = (event: KeyboardEvent) => {
        this.treeview.keyMoveLeft(this.key)
        event.stopPropagation()
        this.updateScroll(event.currentTarget)
      }
      const moveRight = (event: KeyboardEvent) => {
        if (this.isOpen) {
          this.treeview.keyMoveRight(this.key)
        } else {
          this.checkChildren().then(() => {
            if (this.hasChildren) {
              this.open()
              this.$nextTick(function () {
                this.updateScroll(event.currentTarget)
              })
            }
          })
        }
        event.stopPropagation()
      }
      const toggleOpen = (event: KeyboardEvent) => {
        if (this.hasChildren) {
          this.checkChildren().then(this.open)
          this.$nextTick(function () {
            this.updateScroll(event.currentTarget)
          })
        }
      }

      const keyCode = event.keyCode
      if ([keyCodes.down].includes(keyCode)) return moveDown.call(this, event)
      if ([keyCodes.up].includes(keyCode)) return moveUp.call(this, event)
      if ([keyCodes.left].includes(keyCode)) return moveLeft.call(this, event)
      if ([keyCodes.right].includes(keyCode)) return moveRight.call(this, event)
      if ([keyCodes.space].includes(keyCode)) return toggleOpen.call(this, event)
    },
    // Update window scrolling when we expand / collapse
    updateScroll (targetElement: EventTarget | null): void {
      if (!targetElement) {
        return
      }
      const top = (this.treeview.$refs.treeview as HTMLElement).getBoundingClientRect().top +
        (<HTMLElement>targetElement).getBoundingClientRect().top
      this.$nextTick(function () {
        (this.treeview.$refs.treeview as HTMLElement).scrollTop = top
      })
    },
  },

  render (h): VNode {
    const children = [this.genNode()]

    if (this.transition) children.push(this.genTransition())
    else children.push(this.genChildrenWrapper())

    return h('div', { // li
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
        'aria-expanded': this.ariaExpanded,
        'aria-live': this.hasChildren ? 'polite' : null,
        'aria-popup': this.ariaPopup,
        role: 'treeitem',
        tabindex: this.tabindex,
      },
      on: {
        blur: (event: Event) => {
          event.preventDefault()
          this.handleFocus(event)
        },
        focus: (event: Event) => {
          event.preventDefault()
          this.handleFocus(event)
        },
        keydown: (event: KeyboardEvent) => this.handkeKey(event),
      },
      ref: 'treeviewnode',
    }, children)
  },
})

export default VTreeviewNode
