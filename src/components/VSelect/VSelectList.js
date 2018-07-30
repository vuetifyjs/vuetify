import '../../stylus/components/_cards.styl'

// Components
import VCheckbox from '../VCheckbox'
import VDivider from '../VDivider'
import VSubheader from '../VSubheader'
import {
  VList,
  VListTile,
  VListTileAction,
  VListTileContent,
  VListTileTitle
} from '../VList'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Helpers
import {
  escapeHTML,
  getPropertyFromItem
} from '../../util/helpers'

/* @vue/component */
export default {
  name: 'v-select-list',

  mixins: [
    Colorable,
    Themeable
  ],

  props: {
    action: Boolean,
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
    noDataText: String,
    noFilter: Boolean,
    searchInput: {
      default: null
    },
    selectedItems: {
      type: Array,
      default: () => []
    }
  },

  computed: {
    parsedItems () {
      return this.selectedItems.map(item => this.getValue(item))
    },
    tileActiveClass () {
      return Object.keys(this.addTextColorClassChecks()).join(' ')
    },
    staticNoDataTile () {
      const tile = {
        on: {
          mousedown: e => e.preventDefault() // Prevent onBlur from being called
        }
      }

      return this.$createElement(VListTile, tile, [
        this.genTileContent(this.noDataText)
      ])
    }
  },

  methods: {
    genAction (item, inputValue) {
      const data = {
        on: {
          click: e => {
            e.stopPropagation()
            this.$emit('select', item)
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
    genDivider (props) {
      return this.$createElement(VDivider, { props })
    },
    genFilteredText (text) {
      text = (text || '').toString()

      if (!this.searchInput || this.noFilter) return escapeHTML(text)

      const { start, middle, end } = this.getMaskedCharacters(text)

      return `${escapeHTML(start)}${this.genHighlight(middle)}${escapeHTML(end)}`
    },
    genHeader (props) {
      return this.$createElement(VSubheader, { props }, props.header)
    },
    genHighlight (text) {
      return `<span class="v-list__tile__mask">${escapeHTML(text)}</span>`
    },
    getMaskedCharacters (text) {
      const searchInput = (this.searchInput || '').toString().toLowerCase()
      const index = text.toLowerCase().indexOf(searchInput)

      if (index < 0) return { start: '', middle: text, end: '' }

      const start = text.slice(0, index)
      const middle = text.slice(index, index + searchInput.length)
      const end = text.slice(index + searchInput.length)
      return { start, middle, end }
    },
    genTile (
      item,
      disabled = null,
      avatar = false,
      value = this.hasItem(item)
    ) {
      if (item === Object(item)) {
        avatar = this.getAvatar(item)
        disabled = disabled !== null
          ? disabled
          : this.getDisabled(item)
      }

      const tile = {
        on: {
          mousedown: e => {
            // Prevent onBlur from being called
            e.preventDefault()
          },
          click: () => disabled || this.$emit('select', item)
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
        return this.$createElement(VListTile, tile, [
          this.action && !this.hideSelected && this.items.length > 0
            ? this.genAction(item, value)
            : null,
          this.genTileContent(item)
        ])
      }

      const parent = this
      const scopedSlot = this.$scopedSlots.item({ parent, item, tile })

      return this.needsTile(scopedSlot)
        ? this.$createElement(VListTile, tile, [scopedSlot])
        : scopedSlot
    },
    genTileContent (item) {
      const innerHTML = this.genFilteredText(this.getText(item))

      return this.$createElement(VListTileContent,
        [this.$createElement(VListTileTitle, {
          domProps: { innerHTML }
        })]
      )
    },
    hasItem (item) {
      return this.parsedItems.indexOf(this.getValue(item)) > -1
    },
    needsTile (tile) {
      return tile.componentOptions == null ||
        tile.componentOptions.Ctor.options.name !== 'v-list-tile'
    },
    getAvatar (item) {
      return Boolean(getPropertyFromItem(item, this.itemAvatar, false))
    },
    getDisabled (item) {
      return Boolean(getPropertyFromItem(item, this.itemDisabled, false))
    },
    getText (item) {
      return String(getPropertyFromItem(item, this.itemText, item))
    },
    getValue (item) {
      return getPropertyFromItem(item, this.itemValue, this.getText(item))
    }
  },

  render () {
    const children = []
    for (const item of this.items) {
      if (this.hideSelected &&
        this.hasItem(item)
      ) continue

      if (item == null) children.push(this.genTile(item))
      else if (item.header) children.push(this.genHeader(item))
      else if (item.divider) children.push(this.genDivider(item))
      else children.push(this.genTile(item))
    }

    children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile)

    return this.$createElement('div', {
      staticClass: 'v-select-list v-card',
      'class': this.themeClasses
    }, [
      this.$createElement(VList, {
        props: {
          dense: this.dense
        }
      }, children)
    ])
  }
}
