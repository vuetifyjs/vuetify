<template>
  <v-navigation-drawer
    v-scroll="onScroll"
    app
    clipped
    floating
    color="transparent"
    right
  >
    <ul class="pt-8 mb-6 documentation-toc">
      <li class="mb-2">
        <h3 class="grey--text text--darken-3 body-1">Contents</h3>
      </li>

      <template v-for="(item, i) in toc">
        <li
          v-if="item.visible"
          :key="i"
          :class="{
            'mb-2': i + 1 !== toc.length,
            'primary--text': activeIndex === i,
            'text--disabled': activeIndex !== i
          }"
          :style="{
            borderColor: activeIndex === i ? 'currentColor' : undefined
          }"
          class="documentation-toc__link"
        >
          <a
            :href="`#${item.id}`"
            class="d-block"
            @click.stop.prevent="goTo(`#${item.id}`)"
            v-html="item.text"
          />
        </li>
      </template>
    </ul>

    <div class="pl-5">
      <supporters-supporter-group
        :group="supporters['Diamond']"
        compact
        justify="start"
      />
    </div>
  </v-navigation-drawer>
</template>
<script>
  // Utilities
  import { goTo } from '@/util/helpers'
  import {
    get,
    sync,
  } from 'vuex-pathify'
  import kebabCase from 'lodash/kebabCase'

  export default {
    name: 'DocumentationToc',

    data: () => ({
      activeIndex: 0,
      currentOffset: 0,
    }),

    computed: {
      headings: get('documentation/headings'),
      namespace: get('documentation/namespace'),
      page: get('documentation/page'),
      supporters: sync('app/supporters'),
      toc () {
        const t = string => this.$t(`${this.namespace}.${this.page}.${string}`)

        return this.headings
          .map(h => {
            const translation = h.indexOf('.') > -1
              ? this.$t(h)
              : t(h)
            let text = translation.split(' ')

            text.shift()
            text = text.join(' ')

            return {
              id: kebabCase(text),
              text,
              visible: translation.indexOf('###') === -1,
            }
          })
          .filter(h => h.visible)
      },
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
      padding: 0 24px 0 8px

    li a
      color: inherit
      font-size: .875rem
      font-weight: 400
      text-decoration: none
      transition: color .1s ease-in

    .supporter-group
        justify-content: flex-start !important
        margin-left: 20px !important
</style>
