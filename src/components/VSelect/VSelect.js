// Styles
import '../../stylus/components/_text-fields.styl'
import '../../stylus/components/_select.styl'

// Components
// import VBtn from '../../VBtn'
import VCard from '../VCard'
import VCheckbox from '../VCheckbox'
// import VChip from '../../VChip'
import VDivider from '../VDivider'
import VMenu from '../VMenu'
import VSubheader from '../VSubheader'
import {
  VList,
  VListTile,
  VListTileAction,
  VListTileContent,
  VListTileTitle
} from '../VList'

// Extensions
import VTextField from '../VTextField/VTextField'

// Mixins
import Dependent from '../../mixins/dependent'

// Directives
import ClickOutside from '../../directives/click-outside'

// Helpers
import { getObjectValueByPath } from '../../util/helpers'

export default {
  name: 'v-select',

  extends: VTextField,

  directives: {
    ClickOutside
  },

  mixins: [
    Dependent
  ],

  data: () => ({
    isMenuActive: false,
    selectedItems: []
  }),

  props: {
    ...VMenu.props, // remove some, just for testing,
    appendIcon: {
      type: String,
      default: 'arrow_drop_down'
    },
    appendIconCb: Function,
    attach: Boolean,
    auto: Boolean,
    autocomplete: Boolean,
    browserAutocomplete: {
      type: String,
      default: 'on'
    },
    cacheItems: Boolean,
    chips: Boolean,
    clearable: Boolean,
    combobox: Boolean,
    contentClass: String,
    deletableChips: Boolean,
    dense: Boolean,
    editable: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    },
    itemAvatar: {
      type: String,
      default: 'avatar'
    },
    itemDisabled: {
      type: String,
      default: 'disabled'
    },
    itemText: {
      type: String,
      default: 'text'
    },
    itemValue: {
      type: String,
      default: 'value'
    },
    maxHeight: {
      type: [Number, String],
      default: 300
    },
    minWidth: {
      type: [Boolean, Number, String],
      default: false
    },
    multiple: Boolean,
    multiLine: Boolean,
    openOnClear: Boolean,
    overflow: Boolean,
    returnObject: Boolean,
    searchInput: {
      default: null
    },
    segmented: Boolean,
    singleLine: Boolean,
    tags: Boolean,
    valueComparator: {
      type: Function,
      default: (a, b) => {
        if (a !== Object(a)) return a === b
        const aProps = Object.keys(a)
        const bProps = Object.keys(b)
        return aProps.length === bProps.length && aProps.every(propName => (a[propName] === b[propName]))
      }
    }
  },

  computed: {
    classes () {
      const classes = {
        'v-input--select v-input--text': true,
        'v-input--select--chips': this.chips,
        'v-input--select--autocomplete': this.isAutocomplete
      }

      return classes
    },
    computedItems () {
      return this.cachedItems.concat(this.items)
    },
    tileActiveClass () {
      return Object.keys(this.addTextColorClassChecks()).join(' ')
    },
    dynamicHeight () {
      return this.chips ? 'auto' : '32px'
    }
  },

  methods: {
    findExistingIndex (item) {
      const itemValue = this.getValue(item)
      return this.internalValue.findIndex(i => this.valueComparator(this.getValue(i), itemValue))
    },
    genAction (item, inputValue) {
      if (!this.multiple || this.isHidingSelected) return null

      const data = {
        on: {
          click: e => {
            e.stopPropagation()
            this.selectItem(item)
          }
        }
      }

      return this.$createElement(VListTileAction, data, [
        this.$createElement(VCheckbox, {
          props: {
            color: this.computedColor,
            inputValue
          }
        })
      ])
    },
    genCommaSelection (item, index, last) {
      return this.$createElement('div', {
        staticClass: 'input-group__selections__comma',
        'class': {
          'input-group__selections__comma--active': index === this.selectedIndex
        },
        key: JSON.stringify(this.getValue(item)) // Item may be an object
      }, `${this.getText(item)}${last ? '' : ', '}`)
    },
    genDefaultSlot () {
      const activator = this.$createElement('div', {
        staticClass: 'v-input--select__slot',
        slot: 'activator'
      }, [
        this.genLabel(),
        this.prefix ? this.genAffix('prefix') : null,
        this.genSelections(),
        this.genInput(),
        this.suffix ? this.genAffix('suffix') : null,
        this.genIconSlot(),
        this.genProgress()
      ])

      return [this.genMenu(activator)]
    },
    genDivider (props) {
      return this.$createElement(VDivider, { props })
    },
    genHeader (props) {
      return this.$createElement(VSubheader, { props }, props.header)
    },
    genList () {
      const children = this.items.map(o => {
        if (o.header) return this.genHeader(o)
        if (o.divider) return this.genDivider(o)
        else return this.genTile(o)
      })

      if (!children.length) {
        const noData = this.$slots['no-data']
        if (noData) {
          children.push(noData)
        } else {
          children.push(this.genTile(this.noDataText, true))
        }
      }

      return this.$createElement(VCard, {
        props: {
          dark: this.dark,
          light: this.light
        }
      }, [
        this.$createElement(VList, {
          props: { dense: this.dense },
          ref: 'list'
        }, children)
      ])
    },
    genMenu (activator) {
      const props = { activator: this.$el }

      // Later this might be filtered
      for (let prop of Object.keys(VMenu.props)) {
        props[prop] = this[prop]
      }

      props.closeOnContentClick = false
      props.value = this.isMenuActive

      return this.$createElement(VMenu, {
        ref: 'menu',
        props,
        on: {
          input: val => (this.isMenuActive = val)
        }
      }, [activator, this.genList()])
    },
    genSelections () {
      if (this.hideSelections) return []

      let length = this.selectedItems.length
      const children = new Array(length)

      let genSelection
      if (this.$scopedSlots.selection) {
        genSelection = this.genSlotSelection
      } else if (this.chips) {
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

      return children
    },
    genTile (
      item,
      disabled,
      avatar = false,
      value = this.selectedItems.indexOf(item) !== -1
    ) {
      if (item === Object(item)) {
        avatar = this.getAvatar(item)
        disabled = disabled != null
          ? disabled
          : this.getDisabled(item)
      }

      const tile = {
        on: {
          click: () => {
            if (disabled) return

            this.selectItem(item)
          }
        },
        props: {
          activeClass: this.tileActiveClass,
          avatar,
          disabled,
          ripple: true,
          value
        }
      }

      if (!this.$scopedSlots.item) {
        return this.$createElement(VListTile, tile,
          [
            this.genAction(item, value),
            this.genTileContent(item)
          ]
        )
      }

      const parent = this
      const scopedSlot = this.$scopedSlots.item({ parent, item, tile })

      return this.needsTile(tile)
        ? this.$createElement(VListTile, tile, [scopedSlot])
        : scopedSlot
    },
    genTileContent (item) {
      return this.$createElement(VListTileContent,
        [this.$createElement(VListTileTitle, {
          domProps: {
            innerHTML: this.getText(item)
          }
        })]
      )
    },
    getAvatar (item) {
      return this.getPropertyFromItem(item, this.itemAvatar)
    },
    getDisabled (item) {
      return this.getPropertyFromItem(item, this.itemDisabled)
    },
    getText (item) {
      return this.getPropertyFromItem(item, this.itemText)
    },
    getValue (item) {
      return this.getPropertyFromItem(item, this.itemValue)
    },
    getPropertyFromItem (item, field) {
      if (item !== Object(item)) return item

      const value = getObjectValueByPath(item, field)

      return typeof value === 'undefined' ? item : value
    },
    onClick () {
      this.isMenuActive = true
    },
    selectItem (item) {
      if (!this.multiple) {
        this.internalValue = this.returnObject ? item : this.getValue(item)
        this.selectedItems = [item]
        this.isMenuActive = false
      } else {
        const selectedItems = []
        const internalValue = this.internalValue.slice()
        const i = this.findExistingIndex(item)

        i !== -1 ? internalValue.splice(i, 1) : internalValue.push(item)
        this.internalValue = internalValue.map(i => {
          selectedItems.push(i)
          return this.returnObject ? i : this.getValue(i)
        })

        this.selectedItems = selectedItems
        this.selectedIndex = -1
      }
    }
  }
}
