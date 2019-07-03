// Styles
import '../VCard/VCard.sass'

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
import { VNode } from 'vue'
import { PropValidator } from 'vue/types/options'

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
      type: [String, Array, Function],
      default: 'disabled',
    } as PropValidator<string | (string | number)[] | ((item: object, fallback?: any) => any)>,
    itemText: {
      type: [String, Array, Function],
      default: 'text',
    } as PropValidator<string | (string | number)[] | ((item: object, fallback?: any) => any)>,
    itemValue: {
      type: [String, Array, Function],
      default: 'value',
    } as PropValidator<string | (string | number)[] | ((item: object, fallback?: any) => any)>,
    noDataText: String,
    noFilter: Boolean,
    searchInput: {
      default: null,
    } as PropValidator<any>,
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
    genLabelledBy (item: object) {
      const text = escapeHTML(this.getText(item).split(' ').join('-').toLowerCase())

      return `${text}-list-item-${this._uid}`
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
      disabled = null as null | boolean,
      value = false
    ): VNode | VNode[] | undefined {
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
          'aria-labelledby': this.genLabelledBy(item),
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
          this.genTileContent(item),
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
    genTileContent (item: any): VNode {
      const innerHTML = this.genFilteredText(this.getText(item))

      return this.$createElement(VListItemContent,
        [this.$createElement(VListItemTitle, {
          attrs: { id: this.genLabelledBy(item) },
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
      class: this.themeClasses,
    }, [
      this.$createElement(VList, {
        attrs: {
          id: this.$attrs.id,
          role: 'listbox',
          tabindex: -1,
        },
        props: { dense: this.dense },
      }, children),
    ])
  },
})
