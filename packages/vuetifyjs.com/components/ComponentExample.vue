<template lang="pug">
  div.component-example(:id="id")
    h3(v-text="header").title
    div.my-3.justify
      slot(name="desc")
    p
      div(:id="'example-'+uid")
    codepen(ref="codepen" :pen="pen").mb-5
    v-card
      v-expansion-panel.elevation-0
        v-expansion-panel-content(v-model="panel").grey.lighten-4
          div(slot="header").text-xs-center
            span.grey--text  {{ $t('Components.ComponentPage.showExample') }}
          v-tabs(ref="tabs" :scrollable="false")
            v-tabs-bar(class="pl-0").grey.lighten-4.px-3
              v-tabs-slider(color="accent")
              v-tabs-item(
                v-for="tab in tabs"
                v-bind:key="tab"
                v-bind:href="'#'+tab"
                v-show="parsed[tab]"
                active-class=""
              ) {{ tab }}
              v-spacer
              v-btn(
                flat
                v-on:click="sendToCodepen"
              ).grey--text
                v-icon.mr-3 fa-codepen
                span {{ $t(`Components.ComponentPage.openInCodePen`) }}
            v-tabs-items
              v-tabs-content(
                v-for="tab in tabs"
                v-bind:key="tab"
                v-bind:id="tab"
              )
                markup(color="white" :lang="getLang(tab)" v-if="parsed[tab]").ma-0
                  div(v-html="parsed[tab]")

      //v-toolbar(v-bind:color="currentColor" flat dense dark)
        v-btn(dark icon :to="{ hash: id }")
          v-icon link
        span.title.white--text.layout.align-end {{ header }}
          span(v-if="newIn").ml-2.body-2.red--text.text--lighten-2 (New in {{ newIn }}+)
        v-spacer
        v-tooltip(bottom)
          v-btn(
            dark
            icon
            tag="a"
            v-bind:href="'https://github.com/vuetifyjs/docs/tree/master/examples/'+file+'.vue'"
            target="_blank"
            slot="activator"
          )
            v-icon fa-github
          span View on Github
        v-tooltip(bottom)
          v-btn(
            dark
            icon
            v-on:click="sendToCodepen"
            slot="activator"
          )
            v-icon fa-codepen
          span Edit in codepen
        v-tooltip(bottom)
          v-btn(
            dark
            icon
            v-on:click.stop="panel = !panel"
            slot="activator"
          )
            v-icon code
          span View source
</template>

<script>
  import Vue from 'vue'
  const release = process.env.RELEASE
  const path = require('path')
  const resolve = (file) => path.resolve(__dirname, file)

  export default {
    name: 'component-example',

    data () {
      return {
        tabs: ['template', 'script', 'style'],
        component: null,
        instance: null,
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
      file: String,
      header: String,
      newIn: String,
      id: String
    },

    computed: {
      currentColor () {
        return this.$store.state.currentColor
      }
    },

    watch: {
      panel () {
        this.$refs.tabs.slider()
      }
    },

    beforeDestroy () {
      this.instance.$destroy()
    },

    mounted () {
      this.uid = this._uid
      import(
        /* webpackChunkName: "examples" */
        /* webpackMode: "lazy-once" */
        `../examples/${this.file}.vue`
      ).then(comp => {
        this.instance = new Vue(comp.default)
        this.instance.$mount('#example-'+this.uid)
      })
      this.request(this.file, this.boot)
    },

    methods: {
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
        const xmlhttp = new XMLHttpRequest()
        const vm = this
        const timeout = setTimeout(() => this.loading = true, 500)
        xmlhttp.open('GET', `/${this.url}example-source/${file}.vue`, true)

        xmlhttp.onreadystatechange = function () {
          if(xmlhttp.status == 200 && xmlhttp.readyState == 4) {
            clearTimeout(timeout)
            vm.loading = false
            cb(xmlhttp.responseText)
          }
        }
        xmlhttp.send()
      },
      sendToCodepen () {
        this.$refs.codepen.submit()
      }
    }
  }
</script>

<style lang="stylus">
  .component-example
    margin-bottom: 32px

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

    [data-app]
      min-height: 300px
</style>
