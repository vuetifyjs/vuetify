// Components
import VSimpleCheckbox from '../VCheckbox/VSimpleCheckbox'
import VDivider from '../VDivider'
import VSubheader from '../VSubheader'
import {
  VList,
  VListItem,
  VListItemAction,
  VListItemContent,
  VListItemTitle,
} from '../VList'

// Directives
import ripple from '../../directives/ripple'

// Mixins
import Colorable from '../../mixins/colorable'
import Themeable from '../../mixins/themeable'

// Helpers
import {
  escapeHTML,
  getPropertyFromItem,
} from '../../util/helpers'

// Types
import mixins from '../../util/mixins'
import { VNode, PropType, VNodeChildren } from 'vue'
import { PropValidator } from 'vue/types/options'
import { SelectItemKey } from 'vuetify/types'

type ListTile = { item: any, disabled?: null | boolean, value?: boolean, index: number };

/* @vue/component */
export default mixins(Colorable, Themeable).extend({
  name: 'v-select-list',

  // https://github.com/vuejs/vue/issues/6872
  directives: {
    ripple,
  },

  props: {
    action: Boolean,
    dense: Boolean,
    hideSelected: Boolean,
    items: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
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
    noDataText: String,
    noFilter: Boolean,
    searchInput: null as unknown as PropType<any>,
    selectedItems: {
      type: Array,
      default: () => [],
    } as PropValidator<any[]>,
  },

  computed: {
    parsedItems (): any[] {
      return this.selectedItems.map(item => this.getValue(item))
    },
    tileActiveClass (): string {
      return Object.keys(this.setTextColor(this.color).class || {}).join(' ')
    },
    staticNoDataTile (): VNode {
      const tile = {
        attrs: {
          role: undefined,
        },
        on: {
          mousedown: (e: Event) => e.preventDefault(), // Prevent onBlur from being called
        },
      }

      return this.$createElement(VListItem, tile, [
        this.genTileContent(this.noDataText),
      ])
    },
  },

  methods: {
    genAction (item: object, inputValue: any): VNode {
      return this.$createElement(VListItemAction, [
        this.$createElement(VSimpleCheckbox, {
          props: {
            color: this.color,
            value: inputValue,
          },
          on: {
            input: () => this.$emit('select', item),
          },
        }),
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
      return `<span class="v-list-item__mask">${escapeHTML(text)}</span>`
    },
    getMaskedCharacters (text: string): {
      start: string
      middle: string
      end: string
    } {
      const searchInput = (this.searchInput || '').toString().toLocaleLowerCase()
      const index = text.toLocaleLowerCase().indexOf(searchInput)

      if (index < 0) return { start: text, middle: '', end: '' }

      const start = text.slice(0, index)
      const middle = text.slice(index, index + searchInput.length)
      const end = text.slice(index + searchInput.length)
      return { start, middle, end }
    },
    genTile ({
      item,
      index,
      disabled = null,
      value = false,
    }: ListTile): VNode | VNode[] | undefined {
      if (!value) value = this.hasItem(item)

      if (item === Object(item)) {
        disabled = disabled !== null
          ? disabled
          : this.getDisabled(item)
      }

      const tile = {
        attrs: {
          // Default behavior in list does not
          // contain aria-selected by default
          'aria-selected': String(value),
          id: `list-item-${this._uid}-${index}`,
          role: 'option',
        },
        on: {
          mousedown: (e: Event) => {
            // Prevent onBlur from being called
            e.preventDefault()
          },
          click: () => disabled || this.$emit('select', item),
        },
        props: {
          activeClass: this.tileActiveClass,
          disabled,
          ripple: true,
          inputValue: value,
        },
      }

      if (!this.$scopedSlots.item) {
        return this.$createElement(VListItem, tile, [
          this.action && !this.hideSelected && this.items.length > 0
            ? this.genAction(item, value)
            : null,
          this.genTileContent(item, index),
        ])
      }

      const parent = this
      const scopedSlot = this.$scopedSlots.item({
        parent,
        item,
        attrs: {
          ...tile.attrs,
          ...tile.props,
        },
        on: tile.on,
      })

      return this.needsTile(scopedSlot)
        ? this.$createElement(VListItem, tile, scopedSlot)
        : scopedSlot
    },
    genTileContent (item: any, index = 0): VNode {
      const innerHTML = this.genFilteredText(this.getText(item))

      return this.$createElement(VListItemContent,
        [this.$createElement(VListItemTitle, {
          domProps: { innerHTML },
        })]
      )
    },
    hasItem (item: object) {
      return this.parsedItems.indexOf(this.getValue(item)) > -1
    },
    needsTile (slot: VNode[] | undefined) {
      return slot!.length !== 1 ||
        slot![0].componentOptions == null ||
        slot![0].componentOptions.Ctor.options.name !== 'v-list-item'
    },
    getDisabled (item: object) {
      return Boolean(getPropertyFromItem(item, this.itemDisabled, false))
    },
    getText (item: object) {
      return String(getPropertyFromItem(item, this.itemText, item))
    },
    getValue (item: object) {
      return getPropertyFromItem(item, this.itemValue, this.getText(item))
    },
  },

  render (): VNode {
    const children: VNodeChildren = []
    const itemsLength = this.items.length
    for (let index = 0; index < itemsLength; index++) {
      const item = this.items[index]

      if (this.hideSelected &&
        this.hasItem(item)
      ) continue

      if (item == null) children.push(this.genTile({ item, index }))
      else if (item.header) children.push(this.genHeader(item))
      else if (item.divider) children.push(this.genDivider(item))
      else children.push(this.genTile({ item, index }))
    }

    children.length || children.push(this.$slots['no-data'] || this.staticNoDataTile)

    this.$slots['prepend-item'] && children.unshift(this.$slots['prepend-item'])

    this.$slots['append-item'] && children.push(this.$slots['append-item'])

    return this.$createElement(VList, {
      staticClass: 'v-select-list',
      class: this.themeClasses,
      attrs: {
        role: 'listbox',
        tabindex: -1,
      },
      props: { dense: this.dense },
    }, children)
  },
})
