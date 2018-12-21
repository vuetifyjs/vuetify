<template>
  <div
    v-scroll="onScroll"
    class="mb-4"
    v-on="$listeners"
  >
    <slot name="top" />

    <ul class="app-table-of-contents">
      <li
        v-for="(item, i) in list"
        :key="i"
      >
        <a
          :href="item.id"
          :class="{
            'primary--text': activeIndex === i,
            'grey--text text--darken-1': activeIndex !== i
          }"
          :style="{
            borderColor: activeIndex === i ? 'inherit' : null
          }"
          class="mb-3 d-block"
          @click.stop.prevent="goTo(item.target)"
          v-text="item.text"
        />
      </li>
    </ul>

    <slot />
  </div>
</template>
<script>
  // Utilities
  import {
    mapState
  } from 'vuex'
  import { goTo } from '@/util/helpers'

  export default {
    data: () => ({
      activeIndex: 0,
      currentOffset: 0,
      list: [],
      timeout: null
    }),

    computed: {
      ...mapState('app', ['isLoading'])
    },

    watch: {
      isLoading (val) {
        !val && this.genList()
      }
    },

    methods: {
      goTo,
      async genList () {
        const list = []

        const items = document.querySelectorAll('#page [id]')

        for (const item of items) {
          if (
            // Not a top level heading
            !['H1', 'H2'].includes(item.tagName) ||
            // From previous list
            this.list.find(l => l.item === item)
          ) continue

          list.push({
            item,
            text: item.innerText,
            target: `#${item.id}`
          })
        }

        this.list = list
      },
      findActiveIndex () {
        if (this.currentOffset < 100) {
          this.activeIndex = 0
          return
        }

        const list = this.list.slice().reverse()
        const index = list.findIndex(item => {
          return item.item.offsetParent.offsetTop - 100 < this.currentOffset
        })

        const lastIndex = list.length

        this.activeIndex = index > -1
          ? lastIndex - 1 - index
          : lastIndex
      },
      onScroll () {
        this.currentOffset = window.pageYOffset ||
          document.documentElement.offsetTop

        clearTimeout(this.timeout)

        this.timeout = setTimeout(this.findActiveIndex, 10)
      }
    }
  }
</script>

<style lang="stylus">
  .app-table-of-contents {
    list-style-type: none !important;
    margin: 0;
    padding: 32px 0 0;
    text-align: left;
    width: 100%;

    li a {
      border-left: 2px solid transparent;
      padding-left: 16px;
      text-decoration: none;
      transition: color .1s ease-in;
    }
  }
</style>
