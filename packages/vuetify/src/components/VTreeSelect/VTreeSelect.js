import VAutocomplete from '../VAutocomplete/VAutocomplete'
import VSelect from '../VSelect/VSelect'
import VTreeSelectList from './VTreeSelectList'
import { VTreeviewNodeProps } from '../VTreeview/VTreeviewNode'
import { consoleError } from '../../util/console'

export default VAutocomplete.extend({
  name: 'v-tree-select',
  props: {
    autocomplete: {
      type: Boolean,
      default: false
    },
    openAll: Boolean,
    ...VSelect.options.props,
    ...VAutocomplete.options.props,
    ...VTreeviewNodeProps
  },
  data: () => ({
    selectedItems: []
  }),
  computed: {
    classes () {
      if (this.autocomplete) {
        return Object.assign({}, VSelect.options.computed.classes.call(this), {
          'v-autocomplete': true,
          'v-autocomplete--is-selecting-index': this.selectedIndex > -1
        })
      } else {
        return Object.assign({}, VSelect.options.computed.classes.call(this), {})
      }
    },
    listData () {
      const data = VSelect.options.computed.listData.call(this)
      Object.assign(data.props, { ...VTreeviewNodeProps })
      /* to remove console warns and type conflicts */
      Object.assign(data.props, {
        activatable: this.activatable,
        activeClass: this.activeClass,
        selectable: true,
        selectedColor: this.selectedColor,
        indeterminateIcon: this.indeterminateIcon,
        onIcon: this.onIcon,
        offIcon: this.offIcon,
        expandIcon: this.expandIcon,
        loadingIcon: this.loadingIcon,
        itemKey: this.itemKey,
        itemText: this.itemText,
        itemChildren: this.itemChildren,
        transition: this.transition,
        selectedItems: this.selectedItems,
        openAll: this.openAll,
        openOnClick: this.openOnClick })
      Object.assign(data.on, {
        select: e => {
          this.selectItems(e)
        }
      })
      return data
    },
    staticList () {
      if (this.$slots['no-data'] || this.$slots['prepend-item'] || this.$slots['append-item']) {
        consoleError('assert: staticList should not be called if slots are used')
      }
      return this.$createElement(VTreeSelectList, this.listData)
    }
  },
  methods: {
    register () {},
    genListWithSlot () {
      const slots = ['prepend-item', 'no-data', 'append-item']
        .filter(slotName => this.$slots[slotName])
        .map(slotName => this.$createElement('template', {
          slot: slotName
        }, this.$slots[slotName]))
      // Requires destructuring due to Vue
      // modifying the `on` property when passed
      // as a referenced object
      return this.$createElement(VTreeSelectList, {
        ...this.listData
      }, slots)
    },
    selectItems (items) {
      this.selectedItems = items
      if (!this.multiple) {
        this.isMenuActive = false
      }
    },
    clearableCallback () {
      this.internalValue = null
      this.$refs.input.internalValue = ''
      this.$refs.input.value = ''
      this.selectedItems = []
      this.$nextTick(() => this.$refs.input.focus())
    }
  }
})
