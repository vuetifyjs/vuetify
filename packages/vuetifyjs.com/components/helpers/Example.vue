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

    v-card.mt-4
      //- Example options
      v-toolbar(flat dense card).pr-1
        v-spacer
        v-tooltip(top v-if="hasInverted")
          v-btn(icon slot="activator" @click="invertedProxy = !invertedProxy")
            v-icon(color="grey darken-1") invert_colors
          span Invert colors
        v-tooltip(top)
          v-btn(
            icon
            tag="a"
            v-bind:href="'https://github.com/vuetifyjs/docs/tree/master/examples/'+file+'.vue'"
            target="_blank"
            slot="activator"
          )
            v-icon(color="grey darken-1") fa-github
          span View on Github
        v-tooltip(top)
          v-btn(
            icon
            v-on:click="sendToCodepen"
            slot="activator"
          )
            v-icon(color="grey darken-1") fa-codepen
          span Edit in codepen
        v-tooltip(top)
          v-btn(
            icon
            v-on:click.stop="panel = !panel"
            slot="activator"
          )
            v-icon(color="grey darken-1") code
          span View source

      //- Example markup
      v-expansion-panel.elevation-0
        v-expansion-panel-content(v-model="panel")
          v-divider
          v-tabs(ref="tabs" :scrollable="false")
            v-tabs-bar(class="pl-0").grey.lighten-4.px-3
              v-tabs-slider(color="accent")
              v-tabs-item(
                v-for="tab in tabs"
                v-bind:key="tab"
                v-bind:href="'#'+tab"
                v-show="parsed[tab]"
                active-class=""
                class="body-2"
              ) {{ tab }}
            v-tabs-items(class="grey lighten-3")
              v-tabs-content(
                v-for="tab in tabs"
                v-bind:key="tab"
                v-bind:id="tab"
              )
                markup(:lang="getLang(tab)" v-if="parsed[tab]").ma-0
                  div(v-html="parsed[tab]")
      v-divider

      //- Example mount
      div(:class="exampleClasses").application.application--example.pa-3
        div(:id="'example-'+uid")

    //- Codepen
    codepen(ref="codepen" :pen="pen")
</template>

<script>
  import Vue from 'vue'
  const release = process.env.RELEASE
  const path = require('path')
  const resolve = (file) => path.resolve(__dirname, file)

  export default {
    data () {
      return {
        tabs: ['template', 'script', 'style'],
        component: null,
        instance: null,
        invertedProxy: this.inverted,
        isBooted: false,
        uid: null,
        panel: false,
        parsed: {
          script: null,
          style: null,
          template: null
        },
        pen: {
          script: null,
          style: null,
          template: null
        },
        url: release ? 'releases/' + release + '/' : ''
      }
    },

    props: {
      active: Boolean,
      hasInverted: Boolean,
      file: String,
      header: String,
      desc: String,
      inverted: Boolean,
      newIn: String,
      id: String
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
        this.getMarkup().then(() => this.$refs.tabs.slider())
      }
    },

    created () {
      if (this.active) {
        this.panel = true
      }
    },

    mounted () {
      this.uid = this._uid
      import(
        /* webpackChunkName: "component-examples" */
        /* webpackMode: "lazy-once" */
        `../../examples/${this.file}.vue`
      ).then(comp => {
        this.instance = new Vue(comp.default)
        this.instance.$mount('#example-'+this.uid)
      })
    },

    beforeDestroy () {
      this.instance && this.instance.$destroy()
    },

    methods: {
      getMarkup () {
        if (!this.isBooted) {
          this.isBooted = true
          return this.request(this.file, this.boot)
        }
        return Promise.resolve()
      },
      getLang (tab) {
        if (tab === 'script') return 'js'
        if (tab === 'style') return 'css'
        return 'html'
      },
      parseTemplate (target, template) {
        const string = `(<${target}(.*)?>[\\w\\W]*<\\/${target}>)`
        const regex = new RegExp(string, 'g')
        const parsed = regex.exec(template)

        return parsed
          ? parsed[1]
          : ''
      },
      replaceCharacters (str) {
        return str.replace(/</g, '&lt;').replace(/>/g, '&gt;')
      },
      boot (res) {
        const template = this.parseTemplate('template', res)
        const script = this.parseTemplate('script', res)
        const style = this.parseTemplate('style', res)

        this.parsed = {
          template: this.replaceCharacters(template),
          script: this.replaceCharacters(script),
          style: this.replaceCharacters(style)
        }

        this.pen = {
          template,
          script,
          style
        }
      },
      toggle () {
        this.active = !this.active
      },
      request (file, cb) {
        this.loading = true
        return this.$http.get(`/${this.url}example-source/${file}.vue`).then(({ data }) => {
          cb(data)
          this.loading = false
          return Promise.resolve()
        })
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
      }
    }
  }
</script>

<style lang="stylus">
  @import '../../node_modules/vuetify/src/stylus/settings/_variables.styl'

  .component-example
    // margin-bottom: 32px
    
    .application--example
      transition: .3s $transition.swing

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

    nav.toolbar
      z-index: 0
</style>
