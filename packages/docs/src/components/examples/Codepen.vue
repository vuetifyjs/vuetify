<template>
  <form
    ref="form"
    action="https://codepen.io/pen/define/"
    method="POST"
    target="_blank"
  >
    <input
      type="hidden"
      name="data"
      :value="value"
    >
  </form>
</template>

<script>
  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Codepen',

    props: {
      pen: {
        type: Object,
        default: () => ({}),
      },
      title: {
        type: String,
        default: 'Vuetify Example Pen',
      },
    },

    data: vm => ({

    }),

    computed: {
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
          `https://cdn.jsdelivr.net/npm/vuetify@${this.version}/dist/vuetify.min.css`,
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
          'https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js',
          `https://cdn.jsdelivr.net/npm/vuetify@${this.version}/dist/vuetify.min.js`,
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
          `new Vue({
  el: '#app',
  vuetify: new Vuetify(),
  ${component}
})`
      },
      style () {
        return {
          content: (this.pen.style || '').replace(/(<style.*?>|<\/style>)/g, '').replace(/\n {2}/g, '\n').trim(),
          language: /<style.*lang=["'](.*)["'].*>/.exec(this.pen.style || ''),
        }
      },
      template () {
        const template = this.pen.template || ''

        return template
          .replace(/(<template>|<\/template>$)/g, '')
          .replace(/\n/g, '\n  ')
          .trim()
      },
      value () {
        const data = {
          title: this.title,
          html:
            `<div id="app">
  <v-app id="inspire">
    ${this.template}
  </v-app>
</div>`,
          css: this.style.content,
          css_pre_processor: this.style.language ? this.style.language[1] : 'none',
          css_external: [...this.additionalResources.css, ...this.cssResources].join(';'),
          js: this.script,
          js_pre_processor: 'babel',
          js_external: [...this.additionalResources.js, ...this.jsResources].join(';'),
          editors: this.editors,
        }

        return JSON.stringify(data)
      },
      version: get('app/version'),
    },

    methods: {
      submit () {
        this.$el.submit()
      },
    },
  }
</script>
