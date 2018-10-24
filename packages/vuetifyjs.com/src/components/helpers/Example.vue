<template lang="pug">
  section.component-example(:id="id")
    //- Section header
    h3(v-if="header.length > 0").title.layout.align-center.mb-3
      translation-translatable(:i18n="header").d-inline-flex.align-center
        span(v-text="$t(header)")
        v-chip(
          v-if="newIn"
          class="white--text font-weight-regular"
          color="red lighten-2"
          small
        )
          span(v-text="$t('Generic.Common.newIn')")
          |&nbsp;
          span(v-text="`v${newIn}`")

    //- Description
    // TODO: make independant of english locale
    translation-translatable(v-if="$te(desc, 'en')" :i18n="desc")
      helpers-markdown(
        v-if="$t(desc)"
        :source="$t(desc)"
      )

    v-card(
      :dark="invertedProxy"
      :class="{ 'elevation-0': readonly }"
    ).mt-4
      //- Example options
      v-toolbar(
        flat dense card v-if="!readonly"
      ).pr-1
        v-btn(
          :href="`#${id}`"
          icon
          @click.prevent.stop="goTo"
        )
          v-icon(:color="iconColor") mdi-pound-box
        v-spacer
        v-tooltip(lazy top v-if="hasInverted")
          v-btn(icon slot="activator" @click="invertedProxy = !invertedProxy")
            v-icon(:color="iconColor") invert_colors
          span Invert colors
        v-tooltip(lazy top)
          v-btn(
            icon
            tag="a"
            :href="`https://github.com/vuetifyjs/vuetifyjs.com/tree/master/src/examples/${file}.vue`"
            target="_blank"
            slot="activator"
          )
            v-icon(:color="iconColor") fab fa-github
          span View on Github
        v-tooltip(lazy top)
          v-btn(
            icon
            @click="sendToCodepen"
            slot="activator"
          )
            v-icon(:color="iconColor") fab fa-codepen
          span Edit in codepen
        v-tooltip(lazy top)
          v-btn(
            icon
            @click.stop="togglePanel"
            slot="activator"
          )
            v-icon(:color="iconColor") code
          span View source

      //- Example markup
      v-expansion-panel(
        ref="panel"
        v-model="panel"
      ).elevation-0
        v-expansion-panel-content
          v-divider(v-if="!readonly")
          v-tabs(
            ref="tabs"
            v-model="tab"
            v-show="!readonly"
          )
            v-tab(
              v-for="tab in tabs"
              :key="tab"
              :href="`#${tab}`"
              v-show="parsed[tab]"
              active-class=""
              class="body-2"
            ) {{ tab }}
            v-tabs-items(
              style="background: #2d2d2d;"
            )
              v-tab-item(
                v-for="tab in tabs"
                :key="tab"
                :value="tab"
              )
                helpers-markup(lang="html" v-if="parsed[tab]").ma-0
                  | {{ parsed[tab] }}

      v-divider(v-if="!readonly")

      //- Example mount
      div(data-app :class="exampleClasses").application.application--example.pa-3
        component(:is="component")

    //- Codepen
    helpers-codepen(ref="codepen" :pen="parsed")
</template>

<script>
  import { goTo } from '@/util/helpers'

  const release = process.env.RELEASE

  export default {
    props: {
      active: {
        type: Boolean,
        default: false
      },
      hasInverted: {
        type: Boolean,
        default: false
      },
      file: {
        type: String,
        default: ''
      },
      header: {
        type: String,
        default: ''
      },
      desc: {
        type: String,
        default: ''
      },
      inverted: {
        type: Boolean,
        default: false
      },
      newIn: {
        type: [Boolean, String],
        default: false
      },
      id: {
        type: String,
        default: ''
      },
      readonly: {
        type: Boolean,
        default: false
      }
    },

    data () {
      return {
        tab: 'template',
        tabs: ['template', 'script', 'style'],
        component: null,
        invertedProxy: this.inverted,
        panel: null,
        parsed: {
          script: null,
          style: null,
          template: null,
          codepenDeps: null
        },
        url: release ? `releases/${release}/` : ''
      }
    },

    computed: {
      currentColor () {
        return this.$store.state.currentColor
      },
      iconColor () {
        return 'grey ' + (this.invertedProxy ? 'lighten-1' : 'darken-1')
      },
      exampleClasses () {
        return {
          'theme--dark': this.invertedProxy,
          'theme--light': !this.invertedProxy,
          'grey lighten-3': !this.invertedProxy
        }
      }
    },

    watch: {
      panel () {
        requestAnimationFrame(this.$refs.tabs.callSlider)
      }
    },

    created () {
      if (this.active || this.readonly) {
        this.panel = []
      }
    },

    mounted () {
      import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../../examples/${this.file}.vue`
      ).then(comp => {
        this.component = comp.default
      })

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
      toggle () {
        this.active = !this.active
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
      },
      togglePanel () {
        this.panel = this.panel === 0 ? null : 0
        this.$refs.tabs && requestAnimationFrame(() => {
          this.$refs.tabs.callSlider()
        })
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
