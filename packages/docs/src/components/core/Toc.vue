<template>
  <div
    v-scroll="onScroll"
    class="mb-12"
    v-on="$listeners"
  >
    <slot name="top" />

    <ul class="app-table-of-contents">
      <li class="grey--text text--darken-3 pl-4 mb-2 body-1">Contents</li>
      <li
        v-for="(item, i) in toc"
        :key="i"
        class="mb-2"
      >
        <a
          :href="item.target"
          :class="{
            'primary--text': activeIndex === i,
            'grey--text': activeIndex !== i
          }"
          :style="{
            borderColor: activeIndex === i ? 'inherit' : null
          }"
          class="d-block body-2"
          @click.stop.prevent="goTo(`#${item.id}`)"
          v-text="item.text"
        />
      </li>
    </ul>

    <slot />
  </div>
</template>
<script>
  // Utilities
  import { goTo } from '@/util/helpers'
  import { mapState } from 'vuex'

  export default {
    data: () => ({
      activeIndex: 0,
      currentOffset: 0,
    }),

    computed: {
      ...mapState('documentation', ['toc']),
    },

    methods: {
      goTo,
      findActiveIndex () {
        if (this.currentOffset < 100) {
          this.activeIndex = 0
          return
        }

        const list = this.toc.slice().reverse()
        const index = list.findIndex(item => {
          const section = document.getElementById(item.id)

          if (!section) return false

          return section.offsetTop - 100 < this.currentOffset
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

        this.timeout = setTimeout(this.findActiveIndex, 50)
      },
    },
  }
</script>

<style lang="sass">
.app-table-of-contents
  list-style-type: none !important
  margin: 0
  padding: 32px 0 0
  text-align: left
  width: 100%

  li a
    border-left: 2px solid transparent
    padding-left: 16px
    text-decoration: none
    transition: color .1s ease-in
</style>
