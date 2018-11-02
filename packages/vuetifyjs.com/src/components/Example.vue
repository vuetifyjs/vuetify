<template>
  <v-card class="mb-5 pa-3">
    <v-overline class="mb-3" v-text="file" />

    <div data-app="true">
      <component :is="component" />
    </div>
  </v-card>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { goTo } from '@/util/helpers'

  export default {
    inject: ['page'],

    props: {
      value: {
        type: String,
        default: undefined
      }
    },

    data: () => ({
      component: undefined,
      parsed: {}
    }),

    computed: {
      file () {
        return `${this.kebabCase(this.page)}/${this.value}`
      }
    },

    mounted () {
      import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../examples/${this.file}.vue`
      ).then(comp => {
        this.component = comp.default
      })

      import(
        /* webpackChunkName: "examples-source" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!../examples/${this.file}.vue`
      ).then(comp => this.boot(comp.default))
    },

    methods: {
      getLang (tab) {
        if (tab === 'script') return 'js'
        if (tab === 'style') return 'css'
        return 'vue'
      },
      parseTemplate (target, template) {
        const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
        const regex = new RegExp(string, 'g')
        const parsed = regex.exec(template) || []

        return parsed[1] || ''
      },
      boot (res) {
        const template = this.parseTemplate('template', res)
        const script = this.parseTemplate('script', res)
        const style = this.parseTemplate('style', res)
        const codepenResources = this.parseTemplate('codepen-resources', res)
        const codepenAdditional = this.parseTemplate('codepen-additional', res)

        this.parsed = {
          template,
          script,
          style,
          codepenResources,
          codepenAdditional
        }
      },
      goTo () {
        goTo.call(this, `#${this.id}`)
      },
      kebabCase,
      toggle () {
        this.active = !this.active
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
      },
      togglePanel () {
        const panel = this.$refs.panel.items[0]._uid

        this.$refs.panel.panelClick(panel)
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/settings/_variables.styl'

  #snackbars, #data-tables
    .component-example .application--example
      z-index: auto

  .component-example
    // margin-bottom: 32px

    .application--example
      position: relative
      transition: .3s $transition.swing
      overflow: hidden
      z-index: 0

      > div,
      > form,
      > footer
        width: 100%

    .component-example__panel
      .v-expansion-panel__body
        border: none

      .v-tabs__item, .markup
        height: 100%

      .v-tabs__items
        border: none
        max-height: 500px
        overflow-y: auto

      > li
        border: none

    .justify
      text-align: justify

    aside.v-navigation-drawer,
    .v-overlay
      z-index: 1

    nav.v-toolbar
      z-index: 0
</style>
