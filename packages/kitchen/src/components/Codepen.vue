<template>
  <div>
    <form
      ref="form"
      method="POST"
      action="https://codepen.io/pen/define/"
      target="_blank"
    >
      <input
        :value="value"
        type="hidden"
        name="data"
      >
    </form>

    <v-menu
      :close-on-content-click="false"
      attach
      bottom
      left
      offset-y
      min-width="200"
    >
      <template #activator="{ on }">
        <v-btn
          icon
          title="Compare with another version"
          v-on="on"
        >
          <v-icon>mdi-codepen</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-text>
          <v-text-field
            v-model="version"
            filled
            label="Compare with:"
            prefix="version"
          />
        </v-card-text>
        <v-card-actions>
          <v-btn
            block
            depressed
            @click="submit"
          >
            Compare
            <v-icon right>
              mdi-open-in-new
            </v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-menu>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    name: 'Codepen',

    props: {
      title: {
        type: String,
        default: 'Cooking with Vuetify',
      },
    },

    data: () => ({
      version: '1.4.0',
    }),

    computed: {
      ...mapGetters('app', ['ingredients']),
      cssResources () {
        return [
          'https://fonts.googleapis.com/css?family=Roboto:100,300,400,500,700,900|Material+Icons',
          'https://cdn.materialdesignicons.com/2.5.94/css/materialdesignicons.min.css',
          `https://cdn.jsdelivr.net/npm/vuetify@${this.version}/dist/vuetify.min.css`,
        ]
      },
      jsResources () {
        return [
          'https://cdn.jsdelivr.net/npm/babel-polyfill/dist/polyfill.min.js',
          'https://cdn.jsdelivr.net/npm/vue/dist/vue.js',
          `https://cdn.jsdelivr.net/npm/vuetify@${this.version}/dist/vuetify.min.js`,
        ]
      },
      script () {
        const imports = /(import*) ([^'\n]*) from ([^\n]*)/g
        let component = /export default {([\s\S]*)}/g.exec(this.ingredients.script || '')

        component = ((component && component[1]) || '')
          .replace(/\n {2}/g, '\n')
          .trim()

        let script = /<script>([\s\S]*)export default {/g.exec(this.ingredients.script || '')

        script = ((script && script[1]) || '')
          .replace(imports, '')
          .replace(/\n {2}/g, '\n')
          .trim()

        script += script ? '\n\n' : ''

        return script +
          `new Vue({
  el: '#app',
  ${component}
})`
      },
      style () {
        return {
          content: (this.ingredients.style || '').replace(/(<style.*?>|<\/style>)/g, '').replace(/\n {2}/g, '\n').trim(),
          language: /<style.*lang=["'](.*)["'].*>/.exec(this.ingredients.style || ''),
        }
      },
      template () {
        const template = this.ingredients.template || ''

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
          css_external: [...this.cssResources].join(';'),
          js: this.script,
          js_pre_processor: 'babel',
          js_external: [...this.jsResources].join(';'),
          editors: this.editors,
        }

        return JSON.stringify(data)
      },
    },

    methods: {
      submit () {
        this.$refs.form.submit()
      },
    },
  }
</script>
