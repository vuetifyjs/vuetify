<template>
  <v-navigation-drawer
    app
    clipped
    floating
    color="transparent"
    right
  >

    <ul class="py-8 documentation-toc">
      <li class="mb-2">
        <h3 class="grey--text text--darken-3 body-1">Contents</h3>
      </li>

      <li
        v-for="(item, i) in toc"
        :key="i"
        :class="{
          'primary--text': activeIndex === i,
          'text--disabled': activeIndex !== i
        }"
        :style="{
          borderColor: activeIndex === i ? 'currentColor' : undefined
        }"
        class="mb-2 documentation-toc__link"
      >
        <a
          :href="`#${item.id}`"
          class="d-block"
          @click.stop.prevent="goTo(`#${item.id}`)"
          v-html="item.text"
        />
      </li>
    </ul>
  </v-navigation-drawer>
</template>
<script>
  // Utilities
  import { goTo } from '@/util/helpers'
  import {
    sync,
  } from 'vuex-pathify'

  export default {
    data: () => ({
      activeIndex: 0,
      currentOffset: 0,
    }),

    computed: {
      toc: sync('documentation/toc'),
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
  .documentation-toc
    list-style-type: none !important
    margin: 0
    padding: 32px 0 0
    text-align: left
    width: 100%

    li
      border-left: 2px solid transparent
      padding-left: 8px

    li a
      color: inherit
      font-size: .875rem
      font-weight: 400
      text-decoration: none
      transition: color .1s ease-in
</style>
