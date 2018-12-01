<template>
  <v-card class="mb-5">
    <v-toolbar
      card
      dense
      flat
    >
      <v-spacer />
      <v-btn
        icon
        @click="dark = !dark"
      >
        <v-icon>mdi-invert-colors</v-icon>
      </v-btn>
      <v-btn
        icon
        disabled
      >
        <v-icon>mdi-codepen</v-icon>
      </v-btn>
      <v-btn
        icon
        disabled
      >
        <v-icon>mdi-github-circle</v-icon>
      </v-btn>
      <v-btn
        icon
        @click="expand = !expand"
      >
        <v-icon>mdi-code-tags</v-icon>
      </v-btn>
    </v-toolbar>

    <v-expand-transition v-if="parsed">
      <v-card
        v-if="expand"
        color="#2d2d2d"
        dark
        flat
        tile
      >
        <v-item-group
          v-model="selected"
          class="pa-2"
          mandatory
        >
          <v-item
            v-for="(section, i) in sections"
            v-if="parsed[section]"
            :key="`item-${i}`"
            :value="section"
          >
            <v-btn
              slot-scope="{ active, toggle }"
              :color="active ? 'white' : 'transparent'"
              :light="active"
              class="mr-0"
              depressed
              round
              @click="toggle"
            >
              {{ section }}
            </v-btn>
          </v-item>
        </v-item-group>
        <v-divider />
        <v-window v-model="selected">
          <v-window-item
            v-for="(section, i) in sections"
            v-if="parsed[section]"
            :key="`window-${i}`"
            :value="section"
          >
            <doc-markup
              :value="file"
              class="mb-0"
            >{{ parsed[section] }}</doc-markup>
          </v-window-item>
        </v-window>
      </v-card>
    </v-expand-transition>

    <v-sheet
      :dark="dark"
      tile
    >
      <v-card-text>
        <div data-app="true">
          <component :is="component" />
        </div>
      </v-card-text>
    </v-sheet>
  </v-card>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { goTo } from '@/util/helpers'

  export default {
    inject: ['namespace', 'page'],

    props: {
      value: {
        type: [Object, String],
        default: undefined
      }
    },

    data: () => ({
      component: undefined,
      dark: false,
      expand: false,
      parsed: undefined,
      sections: ['template', 'style', 'script'],
      selected: 'template'
    }),

    computed: {
      internalValue () {
        if (this.value === Object(this.value)) return this.value

        return { file: this.value }
      },
      file () {
        return `${this.kebabCase(this.page)}/${this.internalValue.file}`
      }
    },

    created () {
      this.expand = Boolean(this.internalValue.show)
    },

    mounted () {
      import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../../examples/${this.file}.vue`
      ).then(comp => (this.component = comp.default))

      import(
        /* webpackChunkName: "examples-source" */
        /* webpackMode: "lazy-once" */
        `!raw-loader!../../examples/${this.file}.vue`
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
