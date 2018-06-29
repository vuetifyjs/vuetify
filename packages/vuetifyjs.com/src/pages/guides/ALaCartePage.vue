<template lang="pug">
  doc-view
    section-text(slot="sup" :value="`Guides.ALaCarte.headerText2`")
    template(slot-scope="{ namespace }")
      textarea(
        :style="{ position: 'absolute', left: '-1000px', top: '-1000px' }"
        :value="copy"
        ref="copy"
      )
      section#importing-components
        section-head(:value="`${namespace}.importHeader`")
        section-text(:value="`${namespace}.importText1`")
        markup(lang="js")
          |// .babelrc
          |["transform-imports", {
          |  "vuetify": {
          |    "transform": "vuetify/es5/components/${member}",
          |    "preventFullImport": true
          |  }
          |}]
        app-alert(:value="`${namespace}.alert2`" error)
        markup(lang="js")
          |// main.js
          |import Vue from 'vue'
          |import App from './App.vue'
          |import {
          |  Vuetify, // required
          |  VApp, // required
          |  VNavigationDrawer,
          |  VFooter,
          |  VToolbar,
          |  transitions
          |} from 'vuetify'
          |import { Ripple } from 'vuetify/es5/directives'
          |
          |Vue.use(Vuetify, {
          |   components: {
          |     VApp,
          |     VNavigationDrawer,
          |     VFooter,
          |     VToolbar,
          |     transitions
          |   },
          |   directives: {
          |     Ripple
          |   }
          |})
        app-alert(:value="`${namespace}.alert3`" info)
        section-text(:value="`${namespace}.importText2`")
        markup(lang="js")
          |// main.js
          |// Without `transform-imports` package
          |import Vue from 'vue'
          |import VApp from 'vuetify/es5/components/VApp'
          |import Vuetify from 'vuetify/es5/components/Vuetify'
          |import transitions from 'vuetify/es5/components/transitions'
          |import directives from 'vuetify/es5/directives'
          |
          |Vue.use(Vuetify, {
          |   components: {
          |      VApp,
          |      Vuetify
          |   },
          |   directives,
          |   transitions,
          |})
        section-text(:value="`${namespace}.importText3`")
        markup(lang="js")
          |// .vue files
          |import * as VCard from 'vuetify/es5/components/VCard'
          |
          |export default {
          |  components: {
          |    ...VCard
          |  }
          |}

      section#required-styles
        section-head(:value="`${namespace}.styleHeader`")
        section-text(:value="`${namespace}.styleText1`")
        markup(lang="cli")
          |$ npm install --save-dev stylus stylus-loader
          |# or
          |$ yarn add --dev stylus stylus-loader
        section-text(:value="`${namespace}.styleText2`")
        markup(lang="js")
          |// src/main.js
          |require('vuetify/src/stylus/app.styl')

      section#component-name-list
        section-head(:value="`${namespace}.componentNameListHeader`")
        section-text(:value="`${namespace}.componentNameListText1`")
        v-card
          v-card-title
            v-spacer
            v-text-field(
              append-icon="search"
              label="Search"
              single-line
              hide-details
              v-model="search"
            )
          v-data-table(
              :headers="headers"
              :items="items"
              :customFilter="customFilter"
              :search="search"
              v-model="selected"
              item-key="name"
              select-all
              :rows-per-page-items="[10, 20, {text: '$vuetify.dataIterator.rowsPerPageAll', value: -1}]"
              class="elevation-1"
            )
            template(slot="headerCell" slot-scope="props")
              v-tooltip(lazy bottom)
                span(slot="activator") {{ props.header.text }}
                span {{ props.header.text }}
            template(slot="items" slot-scope="props")
              td
                v-checkbox(
                  primary
                  hide-details
                  v-model="props.selected"
                )
              td(class="text-xs-right")
                span(v-if="props.item.name !== 'directives'") <{{ props.item.name }}></{{ props.item.name }}>
              td(class="text-xs-right") {{ props.item.component }}
              td(class="text-xs-right") {{ props.item.group }}
            template(slot="footer")
              td(colspan="4")
                v-layout(align-center)
                  div
                    v-switch(
                      label="ES5"
                      v-model="es5"
                      hide-details
                    )
                  v-flex
                    v-btn(
                      color="primary"
                      flat
                      @click="copyMarkup"
                      slot="activator"
                    )
                      | Copy markup
                      v-icon(right) content_copy
</template>

<script>
  import alacarteComponents from '@/util/alacarteComponents'

  export default {
    data () {
      return {
        search: '',
        pagination: {},
        selected: [{ name: 'v-app', component: 'VApp', group: 'VApp' }],
        headers: [
          { text: 'Markup', value: 'name' },
          { text: 'Component', value: 'component' },
          { text: 'Group', value: 'group' }
        ],
        es5: false,
        // component list.
        items: alacarteComponents()
      }
    },
    computed: {
      copy () {
        const components = `components: {\n` + this.componentSelection.filter(name => name !== 'directives').map(name => `    ${name}`).join(',\n') + '\n  }'
        const hasDirectives = this.componentSelection.includes('directives')
        const directivesImport = hasDirectives ? `import directives from 'vuetify/es5/directives';\n` : ''
        const items = (hasDirectives ? [components, 'directives'] : [components]).map(v => `  ${v}`).join(',\n')
        const use = `Vue.use(Vuetify, {\n${items}\n});`
        const imports = this.es5 ? this.es5Imports : this.es6Imports
        return `import Vue from 'vue';\n${imports}\n${directivesImport}\n${use}`
      },
      es5Imports () {
        const imports = this.componentSelection
          .filter(name => name !== 'directives')
          .map(name => `import ${name} from 'vuetify/es5/components/${name}';`).join('\n')

        return `import Vuetify from 'vuetify/es5/components/Vuetify';\n${imports}`
      },
      es6Imports () {
        const imports = this.componentSelection
          .filter(name => name !== 'directives')
          .map(name => `  ${name}`)
          .join(',\n')

        return `import {\n  Vuetify,\n${imports}\n} from 'vuetify';`
      },
      isGroup () {
        const isGroup = {}
        this.items.forEach(({ group }) => (isGroup[group] = (group in isGroup) ? isGroup[group] + 1 : 0))
        return isGroup
      },
      isVAppSelected () {
        return !!this.selected.find(item => item.name === 'v-app')
      },
      componentSelection () {
        const names = [...new Set(this.selected.map(({group}) => group))]
        names.sort((a, b) => {
          a = a === 'VApp' ? '' : a
          b = b === 'VApp' ? '' : b
          return a < b ? -1 : a > b
        })
        return names
      }
    },
    watch: {
      isVAppSelected () {
        this.isVAppSelected || alert('VApp component is required, removing it may cause your application not working properly!')
      }
    },
    methods: {
      customFilter (items, search, filter) {
        if (!search) return items
        search = search.toString().toLowerCase()

        return items.filter(item => (
          filter(item['name'], search) || filter(item['component'], search) || filter(item['group'], search)
        ))
      },
      copyMarkup () {
        this.$refs.copy.select()
        document.execCommand('copy')
      }
    }
  }
</script>
