// Styles
import '../VTextField/VTextField.sass'
import './VSelect.sass'

// Components
import VChip from '../VChip'
import VMenu from '../VMenu'
import VSelectList from './VSelectList'

// Extensions
import VInput from '../VInput'
import VTextField from '../VTextField/VTextField'

// Mixins
import Comparable from '../../mixins/comparable'
import Dependent from '../../mixins/dependent'
import Filterable from '../../mixins/filterable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Utilities
import mergeData from '../../util/mergeData'
import { getPropertyFromItem, getObjectValueByPath, keyCodes } from '../../util/helpers'
import { consoleError } from '../../util/console'

// Types
import mixins from '../../util/mixins'
import { VNode, VNodeDirective, PropType, VNodeData } from 'vue'
import { PropValidator } from 'vue/types/options'
import { SelectItemKey } from 'vuetify/types'

export const defaultMenuProps = {
  closeOnClick: false,
  closeOnContentClick: false,
  disableKeys: true,
  openOnClick: false,
  maxHeight: 304,
}

// Types
const baseMixins = mixins(
  VTextField,
  Comparable,
  Dependent,
  Filterable
)

interface options extends InstanceType<typeof baseMixins> {
  $refs: {
    menu: InstanceType<typeof VMenu>
    content: HTMLElement
    label: HTMLElement
    input: HTMLInputElement
    'prepend-inner': HTMLElement
    'append-inner': HTMLElement
    prefix: HTMLElement
    suffix: HTMLElement
  }
}

/* @vue/component */
export default baseMixins.extend<options>().extend({
  name: 'v-select',

  directives: {
    ClickOutside,
  },

  props: {
    appendIcon: {
      type: String,
      default: '$dropdown',
    },
    attach: {
      type: null as unknown as PropType<string | boolean | Element | VNode>,
      default: false,
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    deletableChips: Boolean,
    disableLookup: Boolean,
    eager: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
    itemColor: {
      type: String,
      default: 'primary',
    },
    itemDisabled: {
      type: [String, Array, Function] as PropType<SelectItemKey>,
      default: 'disabled',
    },
    itemText: {
      type: [String, Array, Function] as PropType<SelectItemKey>,
      default: 'text',
    },
    itemValue: {
      type: [String, Array, Function] as PropType<SelectItemKey>,
      default: 'value',
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => defaultMenuProps,
    },
    multiple: Boolean,
    openOnClear: Boolean,
    returnObject: Boolean,
    smallChips: Boolean,
  },

  data () {
    return {
      cachedItems: this.cacheItems ? this.items : [],
      menuIsBooted: false,
      isMenuActive: false,
      lastItem: 20,
      // As long as a value is defined, show it
      // Otherwise, check if multiple
      // to determine which default to provide
      lazyValue: this.value !== undefined
        ? this.value
        : this.multiple ? [] : undefined,
      selectedIndex: -1,
      selectedItems: [] as any[],
      keyboardLookupPrefix: '',
      keyboardLookupLastTime: 0,
    }
  },

  computed: {
    /* All items that the select has */
    allItems (): object[] {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    classes (): object {
      return {
        ...VTextField.options.computed.classes.call(this),
        'v-select': true,
        'v-select--chips': this.hasChips,
        'v-select--chips--small': this.smallChips,
        'v-select--is-menu-active': this.isMenuActive,
        'v-select--is-multi': this.multiple,
      }
    },
    /* Used by other components to overwrite */
    computedItems (): object[] {
      return this.allItems
    },
    computedOwns (): string {
      return `list-${this._uid}`
    },
    computedCounterValue (): number {
      const value = this.multiple
        ? this.selectedItems
        : (this.getText(this.selectedItems[0]) || '').toString()

      if (typeof this.counterValue === 'function') {
        return this.counterValue(value)
      }

      return value.length
    },
    directives (): VNodeDirective[] | undefined {
      return this.isFocused ? [{
        name: 'click-outside',
        value: {
          handler: this.blur,
          closeConditional: this.closeConditional,
          include: () => this.getOpenDependentElements(),
        },
      }] : undefined
    },
    dynamicHeight () {
      return 'auto'
    },
    hasChips (): boolean {
      return this.chips || this.smallChips
    },
    hasSlot (): boolean {
      return Boolean(this.hasChips || this.$scopedSlots.selection)
    },
    isDirty (): boolean {
      return this.selectedItems.length > 0
    },
    listData (): object {
      const scopeId = this.$vnode && (this.$vnode.context!.$options as { [key: string]: any })._scopeId
      const attrs = scopeId ? {
        [scopeId]: true,
      } : {}

      return {
        attrs: {
          ...attrs,
          id: this.computedOwns,
        },
        props: {
          action: this.multiple,
          color: this.itemColor,
          dense: this.dense,
          hideSelected: this.hideSelected,
          items: this.virtualizedItems,
          itemDisabled: this.itemDisabled,
          itemText: this.itemText,
          itemValue: this.itemValue,
          noDataText: this.$vuetify.lang.t(this.noDataText),
          selectedItems: this.selectedItems,
        },
        on: {
          select: this.selectItem,
        },
        scopedSlots: {
          item: this.$scopedSlots.item,
        },
      }
    },
    staticList (): VNode {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }

      return this.$createElement(VSelectList, this.listData)
    },
    virtualizedItems (): object[] {
      return (this.$_menuProps as any).auto
        ? this.computedItems
        : this.computedItems.slice(0, this.lastItem)
    },
    menuCanShow: () => true,
    $_menuProps (): object {
      let normalisedProps = typeof this.menuProps === 'string'
        ? this.menuProps.split(',')
        : this.menuProps

      if (Array.isArray(normalisedProps)) {
        normalisedProps = normalisedProps.reduce((acc, p) => {
          acc[p.trim()] = true
          return acc
        }, {})
      }

      return {
        ...defaultMenuProps,
        eager: this.eager,
        value: this.menuCanShow && this.isMenuActive,
        nudgeBottom: normalisedProps.offsetY ? 1 : 0, // convert to int
        ...normalisedProps,
      }
    },
  },

  watch: {
    internalValue (val) {
      this.initialValue = val
      this.setSelectedItems()
    },
    isMenuActive (val) {
      window.setTimeout(() => this.onMenuActiveChange(val))
    },
    items: {
      immediate: true,
      handler (val) {
        if (this.cacheItems) {
          // Breaks vue-test-utils if
          // this isn't calculated
          // on the next tick
          this.$nextTick(() => {
            this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val))
          })
        }

        this.setSelectedItems()
      },
    },
  },

  methods: {
    /** @public */
    blur (e?: Event) {
      VTextField.options.methods.blur.call(this, e)
      this.isMenuActive = false
      this.isFocused = false
      this.selectedIndex = -1
      this.setMenuIndex(-1)
    },
    /** @public */
    activateMenu () {
      if (
        !this.isInteractive ||
        this.isMenuActive
      ) return

      this.isMenuActive = true
    },
    clearableCallback () {
      this.setValue(this.multiple ? [] : null)
      this.setMenuIndex(-1)
      this.$nextTick(() => this.$refs.input && this.$refs.input.focus())

      if (this.openOnClear) this.isMenuActive = true
    },
    closeConditional (e: Event) {
      if (!this.isMenuActive) return true

      return (
        !this._isDestroyed &&

        // Click originates from outside the menu content
        // Multiple selects don't close when an item is clicked
        (!this.getContent() ||
        !this.getContent().contains(e.target as Node)) &&

        // Click originates from outside the element
        this.$el &&
        !this.$el.contains(e.target as Node) &&
        e.target !== this.$el
      )
    },
    filterDuplicates (arr: any[]) {
      const uniqueValues = new Map()
      for (let index = 0; index < arr.length; ++index) {
        const item = arr[index]

        // Do not deduplicate headers or dividers (#12517)
        if (item.header || item.divider) {
          uniqueValues.set(item, item)
          continue
        }

        const val = this.getValue(item)

        // TODO: comparator
        !uniqueValues.has(val) && uniqueValues.set(val, item)
      }
      return Array.from(uniqueValues.values())
    },
    findExistingIndex (item: object) {
      const itemValue = this.getValue(item)

      return (this.internalValue || []).findIndex((i: object) => this.valueComparator(this.getValue(i), itemValue))
    },
    getContent () {
      return this.$refs.menu && this.$refs.menu.$refs.content
    },
    genChipSelection (item: object, index: number) {
      const isDisabled = (
        this.isDisabled ||
        this.getDisabled(item)
      )
      const isInteractive = !isDisabled && this.isInteractive

      return this.$createElement(VChip, {
        staticClass: 'v-chip--select',
        attrs: { tabindex: -1 },
        props: {
          close: this.deletableChips && isInteractive,
          disabled: isDisabled,
          inputValue: index === this.selectedIndex,
          small: this.smallChips,
        },
        on: {
          click: (e: MouseEvent) => {
            if (!isInteractive) return

            e.stopPropagation()

            this.selectedIndex = index
          },
          'click:close': () => this.onChipInput(item),
        },
        key: JSON.stringify(this.getValue(item)),
      }, this.getText(item))
    },
    genCommaSelection (item: object, index: number, last: boolean) {
      const color = index === this.selectedIndex && this.computedColor
      const isDisabled = (
        this.isDisabled ||
        this.getDisabled(item)
      )

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-select__selection v-select__selection--comma',
        class: {
          'v-select__selection--disabled': isDisabled,
        },
        key: JSON.stringify(this.getValue(item)),
      }), `${this.getText(item)}${last ? '' : ', '}`)
    },
    genDefaultSlot (): (VNode | VNode[] | null)[] {
      const selections = this.genSelections()
      const input = this.genInput()

      // If the return is an empty array
      // push the input
      if (Array.isArray(selections)) {
        selections.push(input)
      // Otherwise push it into children
      } else {
        selections.children = selections.children || []
        selections.children.push(input)
      }

      return [
        this.genFieldset(),
        this.$createElement('div', {
          staticClass: 'v-select__slot',
          directives: this.directives,
        }, [
          this.genLabel(),
          this.prefix ? this.genAffix('prefix') : null,
          selections,
          this.suffix ? this.genAffix('suffix') : null,
          this.genClearIcon(),
          this.genIconSlot(),
          this.genHiddenInput(),
        ]),
        this.genMenu(),
        this.genProgress(),
      ]
    },
    genIcon (
      type: string,
      cb?: (e: Event) => void,
      extraData?: VNodeData
    ) {
      const icon = VInput.options.methods.genIcon.call(this, type, cb, extraData)

      if (type === 'append') {
        // Don't allow the dropdown icon to be focused
        icon.children![0].data = mergeData(icon.children![0].data!, {
          attrs: {
            tabindex: icon.children![0].componentOptions!.listeners && '-1',
            'aria-hidden': 'true',
            'aria-label': undefined,
          },
        })
      }

      return icon
    },
    genInput (): VNode {
      const input = VTextField.options.methods.genInput.call(this)

      delete input.data!.attrs!.name

      input.data = mergeData(input.data!, {
        domProps: { value: null },
        attrs: {
          readonly: true,
          type: 'text',
          'aria-readonly': String(this.isReadonly),
          'aria-activedescendant': getObjectValueByPath(this.$refs.menu, 'activeTile.id'),
          autocomplete: getObjectValueByPath(input.data!, 'attrs.autocomplete', 'off'),
          placeholder: (!this.isDirty && (this.isFocused || !this.hasLabel)) ? this.placeholder : undefined,
        },
        on: { keypress: this.onKeyPress },
      })

      return input
    },
    genHiddenInput (): VNode {
      return this.$createElement('input', {
        domProps: { value: this.lazyValue },
        attrs: {
          type: 'hidden',
          name: this.attrs$.name,
        },
      })
    },
    genInputSlot (): VNode {
      const render = VTextField.options.methods.genInputSlot.call(this)

      render.data!.attrs = {
        ...render.data!.attrs,
        role: 'button',
        'aria-haspopup': 'listbox',
        'aria-expanded': String(this.isMenuActive),
        'aria-owns': this.computedOwns,
      }

      return render
    },
    genList (): VNode {
      // If there's no slots, we can use a cached VNode to improve performance
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        return this.genListWithSlot()
      } else {
        return this.staticList
      }
    },
    genListWithSlot (): VNode {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName,
        }, this.$slots[slotName]))
      // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object
      return this.$createElement(VSelectList, {
        ...this.listData,
      }, slots)
    },
    genMenu (): VNode {
      const props = this.$_menuProps as any
      props.activator = this.$refs['input-slot']

      // Attach to root el so that
      // menu covers prepend/append icons
      if (
        // TODO: make this a computed property or helper or something
        this.attach === '' || // If used as a boolean prop (<v-menu attach>)
        this.attach === true || // If bound to a boolean (<v-menu :attach="true">)
        this.attach === 'attach' // If bound as boolean prop in pug (v-menu(attach))
      ) {
        props.attach = this.$el
      } else {
        props.attach = this.attach
      }

      return this.$createElement(VMenu, {
        attrs: { role: undefined },
        props,
        on: {
          input: (val: boolean) => {
            this.isMenuActive = val
            this.isFocused = val
          },
          scroll: this.onScroll,
        },
        ref: 'menu',
      }, [this.genList()])
    },
    genSelections (): VNode {
      let length = this.selectedItems.length
      const children = new Array(length)

      let genSelection
      if (this.$scopedSlots.selection) {
        genSelection = this.genSlotSelection
      } else if (this.hasChips) {
        genSelection = this.genChipSelection
      } else {
        genSelection = this.genCommaSelection
      }

      while (length--) {
        children[length] = genSelection(
          this.selectedItems[length],
          length,
          length === children.length - 1
        )
      }

      return this.$createElement('div', {
        staticClass: 'v-select__selections',
      }, children)
    },
    genSlotSelection (item: object, index: number): VNode[] | undefined {
      return this.$scopedSlots.selection!({
        attrs: {
          class: 'v-chip--select',
        },
        parent: this,
        item,
        index,
        select: (e: Event) => {
          e.stopPropagation()
          this.selectedIndex = index
        },
        selected: index === this.selectedIndex,
        disabled: !this.isInteractive,
      })
    },
    getMenuIndex () {
      return this.$refs.menu ? (this.$refs.menu as { [key: string]: any }).listIndex : -1
    },
    getDisabled (item: object) {
      return getPropertyFromItem(item, this.itemDisabled, false)
    },
    getText (item: object) {
      return getPropertyFromItem(item, this.itemText, item)
    },
    getValue (item: object) {
      return getPropertyFromItem(item, this.itemValue, this.getText(item))
    },
    onBlur (e?: Event) {
      e && this.$emit('blur', e)
    },
    onChipInput (item: object) {
      if (this.multiple) this.selectItem(item)
      else this.setValue(null)
      // If all items have been deleted,
      // open `v-menu`
      if (this.selectedItems.length === 0) {
        this.isMenuActive = true
      } else {
        this.isMenuActive = false
      }
      this.selectedIndex = -1
    },
    onClick (e: MouseEvent) {
      if (!this.isInteractive) return

      if (!this.isAppendInner(e.target)) {
        this.isMenuActive = true
      }

      if (!this.isFocused) {
        this.isFocused = true
        this.$emit('focus')
      }

      this.$emit('click', e)
    },
    onEscDown (e: Event) {
      e.preventDefault()
      if (this.isMenuActive) {
        e.stopPropagation()
        this.isMenuActive = false
      }
    },
    onKeyPress (e: KeyboardEvent) {
      if (
        this.multiple ||
        !this.isInteractive ||
        this.disableLookup
      ) return

      const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds
      const now = performance.now()
      if (now - this.keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        this.keyboardLookupPrefix = ''
      }
      this.keyboardLookupPrefix += e.key.toLowerCase()
      this.keyboardLookupLastTime = now

      const index = this.allItems.findIndex(item => {
        const text = (this.getText(item) || '').toString()

        return text.toLowerCase().startsWith(this.keyboardLookupPrefix)
      })
      const item = this.allItems[index]
      if (index !== -1) {
        this.lastItem = Math.max(this.lastItem, index + 5)
        this.setValue(this.returnObject ? item : this.getValue(item))
        this.$nextTick(() => this.$refs.menu.getTiles())
        setTimeout(() => this.setMenuIndex(index))
      }
    },
    onKeyDown (e: KeyboardEvent) {
      if (this.isReadonly && e.keyCode !== keyCodes.tab) return

      const keyCode = e.keyCode
      const menu = this.$refs.menu

      // If enter, space, open menu
      if ([
        keyCodes.enter,
        keyCodes.space,
      ].includes(keyCode)) this.activateMenu()

      this.$emit('keydown', e)

      if (!menu) return

      // If menu is active, allow default
      // listIndex change from menu
      if (this.isMenuActive && keyCode !== keyCodes.tab) {
        this.$nextTick(() => {
          menu.changeListIndex(e)
          this.$emit('update:list-index', menu.listIndex)
        })
      }

      // If menu is not active, up/down/home/end can do
      // one of 2 things. If multiple, opens the
      // menu, if not, will cycle through all
      // available options
      if (
        !this.isMenuActive &&
        [keyCodes.up, keyCodes.down, keyCodes.home, keyCodes.end].includes(keyCode)
      ) return this.onUpDown(e)

      // If escape deactivate the menu
      if (keyCode === keyCodes.esc) return this.onEscDown(e)

      // If tab - select item or close menu
      if (keyCode === keyCodes.tab) return this.onTabDown(e)

      // If space preventDefault
      if (keyCode === keyCodes.space) return this.onSpaceDown(e)
    },
    onMenuActiveChange (val: boolean) {
      // If menu is closing and mulitple
      // or menuIndex is already set
      // skip menu index recalculation
      if (
        (this.multiple && !val) ||
        this.getMenuIndex() > -1
      ) return

      const menu = this.$refs.menu

      if (!menu || !this.isDirty) return

      // When menu opens, set index of first active item
      for (let i = 0; i < menu.tiles.length; i++) {
        if (menu.tiles[i].getAttribute('aria-selected') === 'true') {
          this.setMenuIndex(i)
          break
        }
      }
    },
    onMouseUp (e: MouseEvent) {
      // eslint-disable-next-line sonarjs/no-collapsible-if
      if (
        this.hasMouseDown &&
        e.which !== 3 &&
        this.isInteractive
      ) {
        // If append inner is present
        // and the target is itself
        // or inside, toggle menu
        if (this.isAppendInner(e.target)) {
          this.$nextTick(() => (this.isMenuActive = !this.isMenuActive))
        }
      }

      VTextField.options.methods.onMouseUp.call(this, e)
    },
    onScroll () {
      if (!this.isMenuActive) {
        requestAnimationFrame(() => (this.getContent().scrollTop = 0))
      } else {
        if (this.lastItem > this.computedItems.length) return

        const showMoreItems = (
          this.getContent().scrollHeight -
          (this.getContent().scrollTop +
          this.getContent().clientHeight)
        ) < 200

        if (showMoreItems) {
          this.lastItem += 20
        }
      }
    },
    onSpaceDown (e: KeyboardEvent) {
      e.preventDefault()
    },
    onTabDown (e: KeyboardEvent) {
      const menu = this.$refs.menu

      if (!menu) return

      const activeTile = menu.activeTile

      // An item that is selected by
      // menu-index should toggled
      if (
        !this.multiple &&
        activeTile &&
        this.isMenuActive
      ) {
        e.preventDefault()
        e.stopPropagation()

        activeTile.click()
      } else {
        // If we make it here,
        // the user has no selected indexes
        // and is probably tabbing out
        this.blur(e)
      }
    },
    onUpDown (e: KeyboardEvent) {
      const menu = this.$refs.menu

      if (!menu) return

      e.preventDefault()

      // Multiple selects do not cycle their value
      // when pressing up or down, instead activate
      // the menu
      if (this.multiple) return this.activateMenu()

      const keyCode = e.keyCode

      // Cycle through available values to achieve
      // select native behavior
      menu.isBooted = true

      window.requestAnimationFrame(() => {
        menu.getTiles()

        if (!menu.hasClickableTiles) return this.activateMenu()

        switch (keyCode) {
          case keyCodes.up:
            menu.prevTile()
            break
          case keyCodes.down:
            menu.nextTile()
            break
          case keyCodes.home:
            menu.firstTile()
            break
          case keyCodes.end:
            menu.lastTile()
            break
        }
        this.selectItem(this.allItems[this.getMenuIndex()])
      })
    },
    selectItem (item: object) {
      if (!this.multiple) {
        this.setValue(this.returnObject ? item : this.getValue(item))
        this.isMenuActive = false
      } else {
        const internalValue = (this.internalValue || []).slice()
        const i = this.findExistingIndex(item)

        i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item)
        this.setValue(internalValue.map((i: object) => {
          return this.returnObject ? i : this.getValue(i)
        }))

        // When selecting multiple
        // adjust menu after each
        // selection
        this.$nextTick(() => {
          this.$refs.menu &&
            (this.$refs.menu as { [key: string]: any }).updateDimensions()
        })

        // We only need to reset list index for multiple
        // to keep highlight when an item is toggled
        // on and off
        if (!this.multiple) return

        const listIndex = this.getMenuIndex()

        this.setMenuIndex(-1)

        // There is no item to re-highlight
        // when selections are hidden
        if (this.hideSelected) return

        this.$nextTick(() => this.setMenuIndex(listIndex))
      }
    },
    setMenuIndex (index: number) {
      this.$refs.menu && ((this.$refs.menu as { [key: string]: any }).listIndex = index)
    },
    setSelectedItems () {
      const selectedItems = []
      const values = !this.multiple || !Array.isArray(this.internalValue)
        ? [this.internalValue]
        : this.internalValue

      for (const value of values) {
        const index = this.allItems.findIndex(v => this.valueComparator(
          this.getValue(v),
          this.getValue(value)
        ))

        if (index > -1) {
          selectedItems.push(this.allItems[index])
        }
      }

      this.selectedItems = selectedItems
    },
    setValue (value: any) {
      const newValue = this.returnObject ? value : this.getValue(value)
      const oldValue = this.returnObject ? this.internalValue : this.getValue(this.internalValue)

      if (!this.valueComparator(newValue, oldValue)) {
        this.internalValue = value
        this.$emit('change', value)
      }
    },
    isAppendInner (target: any) {
      // return true if append inner is present
      // and the target is itself or inside
      const appendInner = this.$refs['append-inner']

      return appendInner && (appendInner === target || appendInner.contains(target))
    },
  },
})
