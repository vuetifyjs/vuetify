<template>
  <div :id="file" v-bind="attrs">
    <pre data-lang="html">{{ template }}</pre>
    <pre data-lang="js">{{ script }}</pre>
    <pre :data-lang="style.language">{{ style.content }}</pre>
  </div>
</template>

<script>
  import { get } from 'vuex-pathify'

  export default {
    name: 'CodepenEmbed',

    props: {
      file: String,
      pen: Object,
    },

    computed: {
      version: get('app/version'),
      attrs () {
        return {
          'data-height': 500,
          'data-default-tab': 'html,result',
          'data-prefill': this.prefill,
          'data-editable': true,
          'data-class': this.file,
          'data-pen-title': this.file,
        }
      },
      prefill () {
        const json = {
          title: 'Hello',
          description: 'This is a description',
          html_classes: ['loading', 'no_js'],
          stylesheets: this.cssResources,
          scripts: this.jsResources,
        }

        return JSON.stringify(json, null, 0)
      },
      additionalResources () {
        const resources = this.pen.codepenResources || '{}'

        return Object.assign(
          { css: [], js: [] },
          JSON.parse(
            resources.replace(/(<codepen-resources.*?>|<\/codepen-resources>$)/g, ''),
          ),
        )
      },
      additionalScript () {
        const additional = this.pen.codepenAdditional || ''

        return additional
          .replace(/(<codepen-additional.*?>|<\/codepen-additional>$)/g, '')
          .replace(/\n {2}/g, '\n')
          .trim() + (additional ? '\n\n' : '')
      },
      cssResources () {
        return [
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
          'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
          'https://fonts.googleapis.com/css?family=Material+Icons',
          `https://cdn.jsdelivr.net/npm/vuetify@${this.version}/dist/vuetify.css`,
        ]
      },
      editors () {
        const html = this.template && 0b100
        const css = this.style.content && 0b010
        const js = this.script && 0b001

        return (html | css | js).toString(2)
      },
      jsResources () {
        return [
          'https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js',
          'https://unpkg.com/vue@next/dist/vue.global.js',
          `https://unpkg.com/vuetify@${this.version}/dist/vuetify.js`,
        ]
      },
      script () {
        const imports = /(import*) ([^'\n]*) from ([^\n]*)/g
        let component = /export default {([\s\S]*)}/g.exec(this.pen.script || '')

        component = ((component && component[1]) || '')
          .replace(/\n {2}/g, '\n')
          .trim()

        let script = /<script>([\s\S]*)export default {/g.exec(this.pen.script || '')

        script = ((script && script[1]) || '')
          .replace(imports, '')
          .replace(/\n {2}/g, '\n')
          .trim()

        script += script ? '\n\n' : ''

        return this.additionalScript + script +
          `const { createApp } = Vue
  const { createVuetify } = Vuetify

  const vuetify = createVuetify()

  const app = createApp({
    template: '#app-template',${component ? '\n  ' + component : ''}
  }).use(vuetify).mount('#app')`
      },
      style () {
        const language = /<style.*lang=["'](.*)["'].*>/.exec(this.pen.style || '')
        return {
          content: (this.pen.style || '').replace(/(<style.*?>|<\/style>)/g, '').replace(/\n {2}/g, '\n').trim(),
          language: language ?? 'css',
        }
      },
      template () {
        const template = (this.pen.template || '')
          .replace(/(<template>|<\/template>$)/g, '')
          .replace(/\n/g, '\n  ')
          .trim()

        return `<script type="text/x-template" id="app-template">
    <v-app>
      ${template}
    </v-app>
  <\/script>

  <div id="app"></div>`
      },
    },

    mounted () {
      window.__CPEmbed(`#${this.file}`)
    },
  }
</script>
