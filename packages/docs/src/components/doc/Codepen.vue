<template lang="pug">
  form(
    method="POST"
    action="https://codepen.io/pen/define/"
    target="_blank"
    ref="form"
  )
    input(
      type="hidden"
      name="data"
      :value="value"
    )
</template>

<script>
  import { version } from 'vuetify'
  const title = 'Vuetify Example Pen'

  const cssResources = [
    'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900',
    'https://cdn.jsdelivr.net/npm/@mdi/font@5.x/css/materialdesignicons.min.css',
    'https://fonts.googleapis.com/css?family=Material+Icons',
    `https://cdn.jsdelivr.net/npm/vuetify@${version}/dist/vuetify.min.css`,
  ]

  const jsResources = [
    'https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js',
    'https://cdn.jsdelivr.net/npm/vue@2.x/dist/vue.js',
    `https://cdn.jsdelivr.net/npm/vuetify@${version}/dist/vuetify.min.js`,
  ]

  export default {
    name: 'Codepen',

    props: {
      pen: {
        type: Object,
        default: () => ({}),
      },
      title: {
        type: String,
        default: title,
      },
    },

    computed: {
      additionalScript () {
        const additional = this.pen.codepenAdditional || ''

        return additional
          .replace(/(<codepen-additional.*?>|<\/codepen-additional>$)/g, '')
          .replace(/\n {2}/g, '\n')
          .trim() + (additional ? '\n\n' : '')
      },
      additionalResources () {
        const resources = this.pen.codepenResources || '{}'

        return Object.assign(
          { css: [], js: [] },
          JSON.parse(
            resources.replace(/(<codepen-resources.*?>|<\/codepen-resources>$)/g, '')
          )
        )
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
      editors () {
        const html = this.template && 0b100
        const css = this.style.content && 0b010
        const js = this.script && 0b001

        return (html | css | js).toString(2)
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
          css_external: [...this.additionalResources.css, ...cssResources].join(';'),
          js: this.script,
          js_pre_processor: 'babel',
          js_external: [...this.additionalResources.js, ...jsResources].join(';'),
          editors: this.editors,
        }

        return JSON.stringify(data)
      },
    },

    methods: {
      submit () {
        this.$el.submit()
      },
    },
  }
</script>
