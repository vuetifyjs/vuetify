<template>
  <v-navigation-drawer
    id="documentation-toc"
    v-scroll="onScroll"
    :floating="structure === false"
    :right="!$vuetify.rtl"
    app
    clipped
    color="transparent"
  >
    <template v-if="structure !== false">
      <ul class="pt-8 mb-6 documentation-toc">
        <li class="mb-2">
          <h3 class="body-1 text--primary">
            Contents
          </h3>
        </li>

        <template v-for="(item, i) in internalToc">
          <li
            v-if="item.visible"
            :key="i"
            :class="{
              'mb-2': i + 1 !== internalToc.length,
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
        <v-fade-transition appear>
          <supporters-supporter-group
            :group="supporters['Diamond']"
            compact
            title="Diamond Sponsors"
            justify="start"
          />
        </v-fade-transition>
      </div>
    </template>
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
      internalToc: [],
      tocTimeout: 0,
    }),

    computed: {
      headings: get('documentation/headings'),
      namespace: get('documentation/namespace'),
      page: get('documentation/page'),
      structure: sync('documentation/structure'),
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

    watch: {
      toc: {
        immediate: true,
        handler (val) {
          if (!val.length) return

          this.$nextTick(() => {
            this.internalToc = this.toc.slice()
          })
        },
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

        const lastIndex = list.length - 1

        this.activeIndex = index > -1
          ? lastIndex - index
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
  #documentation-toc
    .supporter-group__title
      padding-left: 14px

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
