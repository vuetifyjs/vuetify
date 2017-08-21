export default {
  methods: {
    genBtn (change, children, inputDateForSelectorBtn) {
      return this.$createElement('v-btn', {
        props: {
          dark: this.dark,
          icon: true
        },
        nativeOn: {
          click: e => {
            e.stopPropagation()
            this.tableDate = inputDateForSelectorBtn(change)
          }
        }
      }, children)
    },

    genHeader (keyValue, selectorText) {
      return this.$createElement('div', {
        'class': 'picker--date__header-selector-date'
      }, [
        this.$createElement('transition', {
          props: { name: this.computedTransition }
        }, [
          this.$createElement('strong', {
            key: keyValue
          }, selectorText)
        ])
      ])
    },

    genSelector (keyValue, selectorText, inputDateForSelectorBtn) {
      return this.$createElement('div', {
        'class': 'picker--date__header-selector'
      }, [
        this.genBtn(keyValue - 1, [
          this.$createElement('v-icon', 'chevron_left')
        ], inputDateForSelectorBtn),
        this.genHeader(keyValue, selectorText),
        this.genBtn(keyValue + 1, [
          this.$createElement('v-icon', 'chevron_right')
        ], inputDateForSelectorBtn)
      ])
    }
  }
}
