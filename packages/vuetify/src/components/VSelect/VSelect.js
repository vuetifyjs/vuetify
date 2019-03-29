// Styles
import '../../stylus/components/_text-fields.styl'
import '../../stylus/components/_select.styl'

// Components
import VChip from '../VChip'
import VMenu from '../VMenu'
import VSelectList from './VSelectList'

// Extensions
import VTextField from '../VTextField/VTextField'

// Mixins
import Comparable from '../../mixins/comparable'
import Filterable from '../../mixins/filterable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import { camelize, getPropertyFromItem, keyCodes } from '../../util/helpers'
import { consoleError, consoleWarn } from '../../util/console'

export const defaultMenuProps = {
  closeOnClick: false,
  closeOnContentClick: false,
  openOnClick: false,
  maxHeight: 300
}

/* @vue/component */
export default VTextField.extend({
  name: 'v-select',

  directives: {
    ClickOutside
  },

  mixins: [
    Comparable,
    Filterable
  ],

  props: {
    appendIcon: {
      type: String,
      default: '$vuetify.icons.dropdown'
    },
    appendIconCb: Function,
    attach: {
      type: null,
      default: false
    },
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    deletableChips: Boolean,
    dense: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemAvatar: {
      type: [String, Array, Function],
      default: 'avatar'
    },
    itemDisabled: {
      type: [String, Array, Function],
      default: 'disabled'
    },
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    },
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    },
    menuProps: {
      type: [String, Array, Object],
      default: () => defaultMenuProps
    },
    multiple: Boolean,
    openOnClear: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    smallChips: Boolean
  },

  data: vm => ({
    attrsInput: { role: 'combobox' },
    cachedItems: vm.cacheItems ? vm.items : [],
    content: null,
    isBooted: false,
    isMenuActive: false,
    lastItem: 20,
    // As long as a value is defined, show it
    // Otherwise, check if multiple
    // to determine which default to provide
    lazyValue: vm.value !== undefined
      ? vm.value
      : vm.multiple ? [] : undefined,
    selectedIndex: -1,
    selectedItems: [],
    keyboardLookupPrefix: '',
    keyboardLookupLastTime: 0
  }),

  computed: {
    /* All items that the select has */
    allItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    classes () {
      return Object.assign({}, VTextField.options.computed.classes.call(this), {
        'v-select': true,
        'v-select--chips': this.hasChips,
        'v-select--chips--small': this.smallChips,
        'v-select--is-menu-active': this.isMenuActive
      })
    },
    /* Used by other components to overwrite */
    computedItems () {
      return this.allItems
    },
    counterValue () {
      return this.multiple
        ? this.selectedItems.length
        : (this.getText(this.selectedItems[0]) || '').toString().length
    },
    directives () {
      return this.isFocused ? [{
        name: 'click-outside',
        value: this.blur,
        args: {
          closeConditional: this.closeConditional
        }
      }] : undefined
    },
    dynamicHeight () {
      return 'auto'
    },
    hasChips () {
      return this.chips || this.smallChips
    },
    hasSlot () {
      return Boolean(this.hasChips || this.$scopedSlots.selection)
    },
    isDirty () {
      return this.selectedItems.length > 0
    },
    listData () {
      const scopeId = this.$vnode && this.$vnode.context.$options._scopeId
      return {
        attrs: scopeId ? {
          [scopeId]: true
        } : null,
        props: {
          action: this.multiple && !this.isHidingSelected,
          color: this.color,
          dense: this.dense,
          hideSelected: this.hideSelected,
          items: this.virtualizedItems,
          noDataText: this.$vuetify.t(this.noDataText),
          selectedItems: this.selectedItems,
          itemAvatar: this.itemAvatar,
          itemDisabled: this.itemDisabled,
          itemValue: this.itemValue,
          itemText: this.itemText
        },
        on: {
          select: this.selectItem
        },
        scopedSlots: {
          item: this.$scopedSlots.item
        }
      }
    },
    staticList () {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }

      return this.$createElement(VSelectList, this.listData)
    },
    virtualizedItems () {
      return this.$_menuProps.auto
        ? this.computedItems
        : this.computedItems.slice(0, this.lastItem)
    },
    menuCanShow () { return true },
    $_menuProps () {
      let normalisedProps

      normalisedProps = typeof this.menuProps === 'string'
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
        value: this.menuCanShow && this.isMenuActive,
        nudgeBottom: this.nudgeBottom
          ? this.nudgeBottom
          : normalisedProps.offsetY ? 1 : 0, // convert to int
        ...normalisedProps
      }
    }
  },

  watch: {
    internalValue (val) {
      this.initialValue = val
      this.setSelectedItems()
    },
    isBooted () {
      this.$nextTick(() => {
        if (this.content && this.content.addEventListener) {
          this.content.addEventListener('scroll', this.onScroll, false)
        }
      })
    },
    isMenuActive (val) {
      if (!val) return

      this.isBooted = true
    },
    items: {
      immediate: true,
      handler (val) {
        if (this.cacheItems) {
          this.cachedItems = this.filterDuplicates(this.cachedItems.concat(val))
        }

        this.setSelectedItems()
      }
    }
  },

  mounted () {
    this.content = this.$refs.menu && this.$refs.menu.$refs.content
  },

  methods: {
    /** @public */
    blur (e) {
      this.isMenuActive = false
      this.isFocused = false
      this.$refs.input && this.$refs.input.blur()
      this.selectedIndex = -1
      this.onBlur(e)
    },
    /** @public */
    activateMenu () {
      this.isMenuActive = true
    },
    clearableCallback () {
      this.setValue(this.multiple ? [] : undefined)
      this.$nextTick(() => this.$refs.input.focus())

      if (this.openOnClear) this.isMenuActive = true
    },
    closeConditional (e) {
      return (
        // Click originates from outside the menu content
        !!this.content &&
        !this.content.contains(e.target) &&

        // Click originates from outside the element
        !!this.$el &&
        !this.$el.contains(e.target) &&
        e.target !== this.$el
      )
    },
    filterDuplicates (arr) {
      const uniqueValues = new Map()
      for (let index = 0; index < arr.length; ++index) {
        const item = arr[index]
        const val = this.getValue(item)

        // TODO: comparator
        !uniqueValues.has(val) && uniqueValues.set(val, item)
      }
      return Array.from(uniqueValues.values())
    },
    findExistingIndex (item) {
      const itemValue = this.getValue(item)

      return (this.internalValue || []).findIndex(i => this.valueComparator(this.getValue(i), itemValue))
    },
    genChipSelection (item, index) {
      const isDisabled = (
        this.disabled ||
        this.readonly ||
        this.getDisabled(item)
      )

      return this.$createElement(VChip, {
        staticClass: 'v-chip--select-multi',
        attrs: { tabindex: -1 },
        props: {
          close: this.deletableChips && !isDisabled,
          disabled: isDisabled,
          selected: index === this.selectedIndex,
          small: this.smallChips
        },
        on: {
          click: e => {
            if (isDisabled) return

            e.stopPropagation()

            this.selectedIndex = index
          },
          input: () => this.onChipInput(item)
        },
        key: this.getValue(item)
      }, this.getText(item))
    },
    genCommaSelection (item, index, last) {
      // Item may be an object
      // TODO: Remove JSON.stringify
      const key = JSON.stringify(this.getValue(item))
      const color = index === this.selectedIndex && this.color
      const isDisabled = (
        this.disabled ||
        this.getDisabled(item)
      )

      return this.$createElement('div', this.setTextColor(color, {
        staticClass: 'v-select__selection v-select__selection--comma',
        'class': {
          'v-select__selection--disabled': isDisabled
        },
        key
      }), `${this.getText(item)}${last ? '' : ', '}`)
    },
    genDefaultSlot () {
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
        this.$createElement('div', {
          staticClass: 'v-select__slot',
          directives: this.directives
        }, [
          this.genLabel(),
          this.prefix ? this.genAffix('prefix') : null,
          selections,
          this.suffix ? this.genAffix('suffix') : null,
          this.genClearIcon(),
          this.genIconSlot()
        ]),
        this.genMenu(),
        this.genProgress()
      ]
    },
    genInput () {
      const input = VTextField.options.methods.genInput.call(this)

      input.data.domProps.value = null
      input.data.attrs.readonly = true
      input.data.attrs['aria-readonly'] = String(this.readonly)
      input.data.on.keypress = this.onKeyPress

      return input
    },
    genList () {
      // If there's no slots, we can use a cached VNode to improve performance
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        return this.genListWithSlot()
      } else {
        return this.staticList
      }
    },
    genListWithSlot () {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
      // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object
      return this.$createElement(VSelectList, {
        ...this.listData
      }, slots)
    },
    genMenu () {
      const props = this.$_menuProps
      props.activator = this.$refs['input-slot']

      // Deprecate using menu props directly
      // TODO: remove (2.0)
      const inheritedProps = Object.keys(VMenu.options.props)

      const deprecatedProps = Object.keys(this.$attrs).reduce((acc, attr) => {
        if (inheritedProps.includes(camelize(attr))) acc.push(attr)
        return acc
      }, [])

      for (const prop of deprecatedProps) {
        props[camelize(prop)] = this.$attrs[prop]
      }

      if (process.env.NODE_ENV !== 'production') {
        if (deprecatedProps.length) {
          const multiple = deprecatedProps.length > 1
          let replacement = deprecatedProps.reduce((acc, p) => {
            acc[camelize(p)] = this.$attrs[p]
            return acc
          }, {})
          const props = deprecatedProps.map(p => `'${p}'`).join(', ')
          const separator = multiple ? '\n' : '\''

          const onlyBools = Object.keys(replacement).every(prop => {
            const propType = VMenu.options.props[prop]
            const value = replacement[prop]
            return value === true || ((propType.type || propType) === Boolean && value === '')
          })

          if (onlyBools) {
            replacement = Object.keys(replacement).join(', ')
          } else {
            replacement = JSON.stringify(replacement, null, multiple ? 2 : 0)
              .replace(/"([^(")"]+)":/g, '$1:')
              .replace(/"/g, '\'')
          }

          consoleWarn(
            `${props} ${multiple ? 'are' : 'is'} deprecated, use ` +
            `${separator}${onlyBools ? '' : ':'}menu-props="${replacement}"${separator} instead`,
            this
          )
        }
      }

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
        props,
        on: {
          input: val => {
            this.isMenuActive = val
            this.isFocused = val
          }
        },
        ref: 'menu'
      }, [this.genList()])
    },
    genSelections () {
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
        staticClass: 'v-select__selections'
      }, children)
    },
    genSlotSelection (item, index) {
      return this.$scopedSlots.selection({
        parent: this,
        item,
        index,
        selected: index === this.selectedIndex,
        disabled: this.disabled || this.readonly
      })
    },
    getMenuIndex () {
      return this.$refs.menu ? this.$refs.menu.listIndex : -1
    },
    getDisabled (item) {
      return getPropertyFromItem(item, this.itemDisabled, false)
    },
    getText (item) {
      return getPropertyFromItem(item, this.itemText, item)
    },
    getValue (item) {
      return getPropertyFromItem(item, this.itemValue, this.getText(item))
    },
    onBlur (e) {
      this.$emit('blur', e)
    },
    onChipInput (item) {
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
    onClick () {
      if (this.isDisabled) return

      this.isMenuActive = true

      if (!this.isFocused) {
        this.isFocused = true
        this.$emit('focus')
      }
    },
    onEnterDown () {
      this.onBlur()
    },
    onEscDown (e) {
      e.preventDefault()
      if (this.isMenuActive) {
        e.stopPropagation()
        this.isMenuActive = false
      }
    },
    onKeyPress (e) {
      if (this.multiple) return

      const KEYBOARD_LOOKUP_THRESHOLD = 1000 // milliseconds
      const now = performance.now()
      if (now - this.keyboardLookupLastTime > KEYBOARD_LOOKUP_THRESHOLD) {
        this.keyboardLookupPrefix = ''
      }
      this.keyboardLookupPrefix += e.key.toLowerCase()
      this.keyboardLookupLastTime = now

      const index = this.allItems.findIndex(item => this.getText(item).toLowerCase().startsWith(this.keyboardLookupPrefix))
      const item = this.allItems[index]
      if (index !== -1) {
        this.setValue(this.returnObject ? item : this.getValue(item))
        setTimeout(() => this.setMenuIndex(index))
      }
    },
    onKeyDown (e) {
      const keyCode = e.keyCode

      // If enter, space, up, or down is pressed, open menu
      if (!this.readonly && !this.isMenuActive && [
        keyCodes.enter,
        keyCodes.space,
        keyCodes.up, keyCodes.down
      ].includes(keyCode)) this.activateMenu()

      if (this.isMenuActive && this.$refs.menu) this.$refs.menu.changeListIndex(e)

      // This should do something different
      if (keyCode === keyCodes.enter) return this.onEnterDown(e)

      // If escape deactivate the menu
      if (keyCode === keyCodes.esc) return this.onEscDown(e)

      // If tab - select item or close menu
      if (keyCode === keyCodes.tab) return this.onTabDown(e)
    },
    onMouseUp (e) {
      if (this.hasMouseDown) {
        const appendInner = this.$refs['append-inner']

        // If append inner is present
        // and the target is itself
        // or inside, toggle menu
        if (this.isMenuActive &&
          appendInner &&
          (appendInner === e.target ||
          appendInner.contains(e.target))
        ) {
          this.$nextTick(() => (this.isMenuActive = !this.isMenuActive))
        // If user is clicking in the container
        // and field is enclosed, activate it
        } else if (this.isEnclosed && !this.isDisabled) {
          this.isMenuActive = true
        }
      }

      VTextField.options.methods.onMouseUp.call(this, e)
    },
    onScroll () {
      if (!this.isMenuActive) {
        requestAnimationFrame(() => (this.content.scrollTop = 0))
      } else {
        if (this.lastItem >= this.computedItems.length) return

        const showMoreItems = (
          this.content.scrollHeight -
          (this.content.scrollTop +
          this.content.clientHeight)
        ) < 200

        if (showMoreItems) {
          this.lastItem += 20
        }
      }
    },
    onTabDown (e) {
      const menuIndex = this.getMenuIndex()

      const listTile = this.$refs.menu.tiles[menuIndex]

      // An item that is selected by
      // menu-index should toggled
      if (
        listTile &&
        listTile.className.indexOf('v-list__tile--highlighted') > -1 &&
        this.isMenuActive &&
        menuIndex > -1
      ) {
        e.preventDefault()
        e.stopPropagation()

        listTile.click()
      } else {
        // If we make it here,
        // the user has no selected indexes
        // and is probably tabbing out
        this.blur(e)
      }
    },
    selectItem (item) {
      if (!this.multiple) {
        this.setValue(this.returnObject ? item : this.getValue(item))
        this.isMenuActive = false
      } else {
        const internalValue = (this.internalValue || []).slice()
        const i = this.findExistingIndex(item)

        i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item)
        this.setValue(internalValue.map(i => {
          return this.returnObject ? i : this.getValue(i)
        }))

        // When selecting multiple
        // adjust menu after each
        // selection
        this.$nextTick(() => {
          this.$refs.menu &&
            this.$refs.menu.updateDimensions()
        })
      }
    },
    setMenuIndex (index) {
      this.$refs.menu && (this.$refs.menu.listIndex = index)
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
    setValue (value) {
      const oldValue = this.internalValue
      this.internalValue = value
      value !== oldValue && this.$emit('change', value)
    }
  }
})
