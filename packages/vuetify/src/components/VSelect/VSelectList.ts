// Libraries
import { VNode } from 'vue'

// Styles
import '../../stylus/components/_cards.styl'

// Components
import VCheckbox from '../VCheckbox'
import VDivider from '../VDivider'
import VSubheader from '../VSubheader'
import {
  VList,
  VListItem,
  VListItemAction,
  VListItemContent,
  VListItemTitle
} from '../VList'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Helpers
import {
  escapeHTML,
  getPropertyFromItem
} from '../../util/helpers'
import mixins from '../../util/mixins'
import { PropValidator } from 'vue/types/options'

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-select-list',

  props: {
    action: Boolean,
    dense: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => []
    } as PropValidator<any[]>,
    itemAvatar: {
      type: [String, Array, Function],
      default: 'avatar'
    } as PropValidator<string | (string | number)[] | ((item: object, fallback?: any) => any)>,
    itemDisabled: {
      type: [String, Array, Function],
      default: 'disabled'
    } as PropValidator<string | (string | number)[] | ((item: object, fallback?: any) => any)>,
    itemText: {
      type: [String, Array, Function],
      default: 'text'
    } as PropValidator<string | (string | number)[] | ((item: object, fallback?: any) => any)>,
    itemValue: {
      type: [String, Array, Function],
      default: 'value'
    } as PropValidator<string | (string | number)[] | ((item: object, fallback?: any) => any)>,
    noDataText: String,
    noFilter: Boolean,
    searchInput: {
      default: null
    } as PropValidator<any>,
    selectedItems: {
      type: Array,
      default: () => []
    } as PropValidator<any[]>
  },

  computed: {
    parsedItems (): any {
      return this.selectedItems.map(item => this.getValue(item))
    },
    tileActiveClass (): string {
      return Object.keys(this.setTextColor(this.color).class || {}).join(' ')
    },
    staticNoDataTile (): VNode {
      const tile = {
        on: {
          mousedown: (e: MouseEvent) => e.preventDefault() // Prevent onBlur from being called
        }
      }

      return this.$createElement(VListItem, tile, [
        this.genTileContent(this.noDataText)
      ])
    }
  },

  methods: {
    genAction (item: object, inputValue: any): VNode {
      const data = {
        on: {
          click: (e: MouseEvent) => {
            e.stopPropagation()
            this.$emit('select', item)
          }
        }
      }

      return this.$createElement(VListItemAction, data, [
        this.$createElement(VCheckbox, {
          props: {
            color: this.color,
            inputValue
          }
        })
      ])
    },
    genDivider (props: { [key: string]: any }) {
      return this.$createElement(VDivider, { props })
    },
    genFilteredText (text: string) {
      text = text || ''

      if (!this.searchInput || this.noFilter) return escapeHTML(text)

      const { start, middle, end } = this.getMaskedCharacters(text)

      return `${escapeHTML(start)}${this.genHighlight(middle)}${escapeHTML(end)}`
    },
    genHeader (props: { [key: string]: any }): VNode {
      return this.$createElement(VSubheader, { props }, props.header)
    },
    genHighlight (text: string): string {
      return `<span class="v-list__tile__mask">${escapeHTML(text)}</span>`
    },
    getMaskedCharacters (text: string): {
      start: string
      middle: string
      end: string
    } {
      const searchInput = (this.searchInput || '').toString().toLocaleLowerCase()
      const index = text.toLocaleLowerCase().indexOf(searchInput)

      if (index < 0) return { start: '', middle: text, end: '' }

      const start = text.slice(0, index)
      const middle = text.slice(index, index + searchInput.length)
      const end = text.slice(index + searchInput.length)
      return { start, middle, end }
    },
    genTile (
      item: object,
      disabled = null as unknown as boolean,
      avatar = false,
      value = false
    ): VNode | VNode[] | undefined {
      if (!value) value = this.hasItem(item)

      if (item === Object(item)) {
        avatar = this.getAvatar(item)
        disabled = disabled !== null
          ? disabled
          : this.getDisabled(item)
      }

      const tile = {
        on: {
          mousedown: (e: MouseEvent) => {
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
        return this.$createElement(VListItem, tile, [
          this.action && !this.hideSelected && this.items.length > 0
            ? this.genAction(item, value)
            : null,
          this.genTileContent(item)
        ])
      }

      const parent = this
      const scopedSlot = this.$scopedSlots.item({ parent, item, tile })

      return this.needsTile(scopedSlot)
        ? this.$createElement(VListItem, tile, scopedSlot)
        : scopedSlot
    },
    genTileContent (item: any): VNode {
      const innerHTML = this.genFilteredText(this.getText(item))

      return this.$createElement(VListItemContent,
        [this.$createElement(VListItemTitle, {
          domProps: { innerHTML }
        })]
      )
    },
    hasItem (item: object) {
      return this.parsedItems.indexOf(this.getValue(item)) > -1
    },
    needsTile (slot: VNode[] | undefined) {
      return slot!.length !== 1 ||
        slot![0].componentOptions == null ||
        slot![0].componentOptions.Ctor.options.name !== 'v-list-tile'
    },
    getAvatar (item: object) {
      return Boolean(getPropertyFromItem(item, this.itemAvatar, false))
    },
    getDisabled (item: object) {
      return Boolean(getPropertyFromItem(item, this.itemDisabled, false))
    },
    getText (item: object) {
      return String(getPropertyFromItem(item, this.itemText, item))
    },
    getValue (item: object) {
      return getPropertyFromItem(item, this.itemValue, this.getText(item))
    }
  },

  render (): VNode {
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

    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])

    this.$slots['append-item'] && children.push(this.$slots['append-item'])

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
})
