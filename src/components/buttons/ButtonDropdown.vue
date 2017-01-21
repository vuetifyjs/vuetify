<template lang="pug">
  div(class="btn-dropdown")
    button(ref="btn" v-on:click="beforeEnter")
      span(ref="span" id="span") {{ selectedValue.title }}
      v-icon arrow_drop_down
    transition(name="drop")
      v-card(v-bind:style="styles" v-show="active" ref="card")
        v-list
          v-list-item(v-for="(item, index) in items" ref="item")
            v-list-tile(
              v-bind:item="item" 
              v-on:click.native="select(item, index)"
              v-bind:class="{ 'list__tile--dropdown--active': currentIndex === index }"
              v-bind:id="index"
            )
</template>

<script>
  import { addOnceEventListener } from '../../util/helpers'

  export default {
    data () {
      return {
        active: false,
        dropdownLeft: 0,
        dropdownTop: 0,
        inputValue: null,
        currentIndex: null,
        selectedValue: { title: this.placeholder }
      }
    },

    props: {
      items: {
        type: Array,
        default: () => []
      },

      placeholder: {
        type: String,
        default: 'Select'
      },

      value: {
        required: false
      }
    },

    computed: {
      selectedItem () {
        if (!this.currentIndex) {
          return this.$refs.item[0]
        }

        return this.$refs.item[this.currentIndex]
      }
    },

    methods: {
      beforeEnter () {
        let el = this.$refs.card.$el
        el.style.display = 'block'
        el.style.left = '-16px'

        if (this.currentIndex < 2) {
          el.style.top = `-${20 + (this.selectedItem.clientHeight * this.currentIndex)}px`
        } else if (this.currentIndex === this.items.length - 2) {
          el.style.top = `-${12 + (this.selectedItem.clientHeight * 2)}px`
          el.scrollTop = el.scrollHeight
        } else if (this.currentIndex === this.items.length - 1) {
          el.style.top = `-${12 + (this.selectedItem.clientHeight * 3)}px`
          el.scrollTop = el.scrollHeight
        } else {
          el.style.top = `-${el.clientHeight / 2 - 19}px`
          el.scrollTop = 35 + ((this.currentIndex - 2) * this.selectedItem.clientHeight)
        }

        el.style.display = 'none'
        setTimeout(() => this.active = true, 50)
      },

      leave (el, done) {
        done()
      },

      select (item, index) {
        this.selectedValue = item
        this.currentIndex = index
        this.active = false
      }
    }
  }
</script>