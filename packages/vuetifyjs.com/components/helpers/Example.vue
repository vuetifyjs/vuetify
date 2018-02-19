<template lang="pug">
  section.component-example(:id="id")
    //- Section header
    h3(v-if="header").title.layout.align-center.mb-3
      router-link(
        :to="{ hash: id }"
        v-if="id"
        style="text-decoration: none;"
      ).mr-2
        v-icon(color="accent") mdi-pound
      span(v-text="header")

    //- Description
    markdown(v-if="desc" :source="desc")

    v-card(:class="{ 'elevation-0': readonly }").mt-4
      //- Example options
      v-toolbar(flat dense card v-if="!readonly").pr-1
        v-spacer
        v-tooltip(top v-if="hasInverted")
          v-btn(icon slot="activator" @click="invertedProxy = !invertedProxy")
            v-icon(color="grey darken-1") invert_colors
          span Invert colors
        v-tooltip(top)
          v-btn(
            icon
            tag="a"
            :href="`https://github.com/vuetifyjs/vuetifyjs.com/tree/master/examples/${file}.vue`"
            target="_blank"
            slot="activator"
          )
            v-icon(color="grey darken-1") fa-github
          span View on Github
        v-tooltip(top)
          v-btn(
            icon
            @click="sendToCodepen"
            slot="activator"
          )
            v-icon(color="grey darken-1") fa-codepen
          span Edit in codepen
        v-tooltip(top)
          v-btn(
            icon
            @click.stop="panel = !panel"
            slot="activator"
          )
            v-icon(color="grey darken-1") code
          span View source

      //- Example markup
      v-expansion-panel.elevation-0
        v-expansion-panel-content(v-model="panel")
          v-divider(v-if="!readonly")
          v-tabs(
            ref="tabs"
            color="grey lighten-4"
            v-show="!readonly"
          )
            v-tab(
              v-for="tab in tabs"
              :key="tab"
              v-show="parsed[tab]"
              active-class=""
              class="body-2"
            ) {{ tab }}
            v-tabs-items(class="grey lighten-3")
              v-tab-item(v-for="tab in tabs" :key="tab")
                markup(:lang="getLang(tab)" v-if="parsed[tab]").ma-0
                  | {{ parsed[tab] }}

      v-divider(v-if="!readonly")

      //- Example mount
      div(data-app :class="exampleClasses").application.application--example.pa-3
        component(:is="component")

    //- Codepen
    codepen(ref="codepen" :pen="parsed")
</template>

<script>
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
        type: String,
        default: ''
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
        tabs: ['template', 'script', 'style'],
        component: null,
        invertedProxy: this.inverted,
        panel: false,
        parsed: {
          script: null,
          style: null,
          template: null
        },
        url: release ? `releases/${release}/` : ''
      }
    },

    computed: {
      currentColor () {
        return this.$store.state.currentColor
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
        this.$nextTick(this.$refs.tabs.callSlider)
      }
    },

    created () {
      if (this.active || this.readonly) {
        this.panel = true
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
        ).then(this.boot)
    },

    beforeDestroy () {
      this.instance && this.instance.$destroy()
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

        this.parsed = {
          template,
          script,
          style
        }
      },
      toggle () {
        this.active = !this.active
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
      }
    }
  }
</script>

<style lang="stylus">
  @import '~vuetify/src/stylus/settings/_variables.styl'

  #snackbars .component-example .application--example
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
      .expansion-panel__body
        border: none

      .tabs__item, .markup
        height: 100%

      .tabs__items
        border: none
        max-height: 500px
        overflow-y: auto

      > li
        border: none

    .justify
      text-align: justify

    aside.navigation-drawer,
    .overlay
      z-index: 1

    nav.toolbar
      z-index: 0
</style>
