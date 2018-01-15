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
  const version = require('vuetify/package.json').version || 'latest'

  export default {
    name: 'Codepen',

    props: {
      pen: {
        type: Object,
        default: () => ({})
      }
    },

    data: () => ({
      title: 'Vuetify Example Pen',
      css_external: [
        'https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons',
        `https://unpkg.com/vuetify@${version}/dist/vuetify.min.css`
      ].join(';'),
      js_external: [
        'https://unpkg.com/babel-polyfill/dist/polyfill.min.js',
        'https://unpkg.com/vue/dist/vue.js',
        `https://unpkg.com/vuetify@${version}/dist/vuetify.min.js`
      ].join(';')
    }),

    computed: {
      script () {
        const replace = /(export default {|<script>|<\/script>|}([^}]*)$)/g
        return (this.pen.script || '')
          .replace(replace, '')
          .replace(/\/static\//g, 'https://vuetifyjs.com/static/')
          .replace(/\n {2}/g, '\n')
          .trim()
      },
      style () {
        return {
          content: (this.pen.style || '').replace(/(<style.*?>|<\/style>)/g, '').replace(/\n {2}/g, '\n').trim(),
          language: /<style.*lang=["'](.*)["'].*>/.exec(this.pen.style || '')
        }
      },
      template () {
        const template = this.pen.template || ''

        return template
          .replace(/\/static\//g, 'https://vuetifyjs.com/static/')
          .replace(/(<template>|<\/template>([^</template>]*)$)/g, '')
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
        const data = Object.assign({
          html: `<div id="app">
  <v-app id="inspire">
    ${this.template}
  </v-app>
</div>`,
          css: this.style.content,
          css_pre_processor: this.style.language ? this.style.language[1] : 'none',
          js: `new Vue({
  el: '#app',
  ${this.script}
})`,
          js_pre_processor: 'babel',
          editors: this.editors
        }, this.$data)

        return JSON.stringify(data)
      }
    },

    methods: {
      submit () {
        this.$el.submit()
      }
    }
  }
</script>
