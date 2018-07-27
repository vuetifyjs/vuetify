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
import Menuable from '../../mixins/menuable'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import { getPropertyFromItem, keyCodes } from '../../util/helpers'
import { consoleError } from '../../util/console'

// For api-generator
const fakeVMenu = {
  name: 'v-menu',
  props: VMenu.props // TODO: remove some, just for testing
}

const fakeMenuable = {
  name: 'menuable',
  props: Menuable.props
}

/* @vue/component */
export default {
  name: 'v-select',

  directives: {
    ClickOutside
  },

  extends: VTextField,

  mixins: [
    fakeVMenu,
    fakeMenuable,
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
    auto: Boolean,
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    contentClass: String,
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
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: 0
    },
    multiple: Boolean,
    multiLine: Boolean,
    openOnClear: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    smallChips: Boolean,
    singleLine: Boolean
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
    selectedItems: []
  }),

  computed: {
    /* All items that the select has */
    allItems () {
      return this.filterDuplicates(this.cachedItems.concat(this.items))
    },
    classes () {
      return Object.assign({}, VTextField.computed.classes.call(this), {
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
    menuProps () {
      return {
        closeOnClick: false,
        closeOnContentClick: false,
        openOnClick: false,
        value: this.isMenuActive,
        offsetY: this.offsetY,
        nudgeBottom: this.nudgeBottom
          ? this.nudgeBottom
          : this.offsetY ? 1 : 0 // convert to int
      }
    },
    listData () {
      return {
        props: {
          action: this.multiple && !this.isHidingSelected,
          color: this.color,
          dark: this.dark,
          dense: this.dense,
          hideSelected: this.hideSelected,
          items: this.virtualizedItems,
          light: this.light,
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
      if (this.$slots['no-data']) {
        consoleError('assert: staticList should not be called if slots are used')
      }

      return this.$createElement(VSelectList, this.listData)
    },
    virtualizedItems () {
      return !this.auto
        ? this.computedItems.slice(0, this.lastItem)
        : this.computedItems
    }
  },

  watch: {
    internalValue (val) {
      this.initialValue = val
      this.$emit('change', this.internalValue)
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
    blur () {
      this.isMenuActive = false
      this.isFocused = false
      this.$refs.input && this.$refs.input.blur()
      this.selectedIndex = -1
    },
    /** @public */
    activateMenu () {
      this.isMenuActive = true
    },
    clearableCallback () {
      this.internalValue = this.multiple ? [] : undefined
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
      const focus = (e, cb) => {
        if (isDisabled) return

        e.stopPropagation()
        this.onFocus()
        cb && cb()
      }

      return this.$createElement(VChip, {
        staticClass: 'v-chip--select-multi',
        props: {
          close: this.deletableChips && !isDisabled,
          dark: this.dark,
          disabled: isDisabled,
          selected: index === this.selectedIndex,
          small: this.smallChips
        },
        on: {
          click: e => {
            focus(e, () => {
              this.selectedIndex = index
            })
          },
          focus,
          input: () => this.onChipInput(item)
        },
        key: this.getValue(item)
      }, this.getText(item))
    },
    genCommaSelection (item, index, last) {
      // Item may be an object
      // TODO: Remove JSON.stringify
      const key = JSON.stringify(this.getValue(item))

      const isDisabled = (
        this.disabled ||
        this.readonly ||
        this.getDisabled(item)
      )

      const classes = index === this.selectedIndex
        ? this.addTextColorClassChecks()
        : {}

      classes['v-select__selection--disabled'] = isDisabled

      return this.$createElement('div', {
        staticClass: 'v-select__selection v-select__selection--comma',
        'class': classes,
        key
      }, `${this.getText(item)}${last ? '' : ', '}`)
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

      const activator = this.genSelectSlot([
        this.genLabel(),
        this.prefix ? this.genAffix('prefix') : null,
        selections,
        this.suffix ? this.genAffix('suffix') : null,
        this.genClearIcon(),
        this.genIconSlot()
      ])

      return [this.genMenu(activator)]
    },
    genInput () {
      const input = VTextField.methods.genInput.call(this)

      input.data.domProps.value = null
      input.data.attrs.readonly = true
      input.data.attrs['aria-readonly'] = String(this.readonly)

      return input
    },
    genList () {
      // If there's no slots, we can use a cached VNode to improve performance
      if (this.$slots['no-data']) {
        return this.genListWithSlot()
      } else {
        return this.staticList
      }
    },
    genListWithSlot () {
      // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object
      return this.$createElement(VSelectList, {
        ...this.listData
      }, [
        this.$createElement('template', {
          slot: 'no-data'
        }, this.$slots['no-data'])
      ])
    },
    genMenu (activator) {
      const props = {
        contentClass: this.contentClass
      }
      const inheritedProps = Object.keys(VMenu.props).concat(Object.keys(Menuable.props))

      // Later this might be filtered
      for (let prop of inheritedProps) {
        props[prop] = this[prop]
      }

      props.activator = this.$refs['input-slot']

      Object.assign(props, this.menuProps)

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
      }, [activator, this.genList()])
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
    genSelectSlot (children) {
      return this.$createElement('div', {
        staticClass: 'v-select__slot',
        directives: this.directives,
        slot: 'activator'
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
      else this.internalValue = null

      // If all items have been deleted,
      // open `v-menu`
      if (this.selectedItems.length === 0) {
        this.isMenuActive = true
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
      this.isMenuActive = false
    },
    // Detect tab and call original onBlur method
    onKeyDown (e) {
      const keyCode = e.keyCode

      // If enter, space, up, or down is pressed, open menu
      if (!this.isMenuActive && [
        keyCodes.enter,
        keyCodes.space,
        keyCodes.up, keyCodes.down
      ].includes(keyCode)) this.activateMenu()

      // This should do something different
      if (keyCode === keyCodes.enter) return this.onEnterDown()

      // If escape deactivate the menu
      if (keyCode === keyCodes.esc) return this.onEscDown(e)

      // If tab - select item or close menu
      if (keyCode === keyCodes.tab) return this.onTabDown(e)
    },
    onMouseUp (e) {
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
      } else if (this.isEnclosed) {
        this.isMenuActive = true
      }

      VTextField.methods.onMouseUp.call(this, e)
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
        VTextField.methods.onBlur.call(this, e)
      }
    },
    selectItem (item) {
      if (!this.multiple) {
        this.internalValue = this.returnObject ? item : this.getValue(item)
        this.isMenuActive = false
      } else {
        const internalValue = (this.internalValue || []).slice()
        const i = this.findExistingIndex(item)

        i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item)
        this.internalValue = internalValue.map(i => {
          return this.returnObject ? i : this.getValue(i)
        })

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
    }
  }
}
