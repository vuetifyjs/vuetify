<template lang="pug">
  views-doc
    template(slot-scope="{ namespace }")
      section#classes
        helpers-section-head(:value="`${namespace}.classesHeader`")
        helpers-section-text(:value="`${namespace}.classesText`")
        helpers-example(
          readonly
          file="colors/classes"
        )
        helpers-section-text(:value="`${namespace}.classesText2`")
        helpers-example(
          readonly
          file="colors/textClasses"
        )

      section#javascript-color-pack
        helpers-section-head(:value="`${namespace}.javascriptPackHeader`")
        helpers-section-text(:value="`${namespace}.javascriptPackText`")
        helpers-markup(lang="js")
          | // src/index.js
          |
          | // Libraries
          | import Vue from 'vue'
          | import Vuetify from 'vuetify'
          |
          | // Helpers
          | import colors from 'vuetify/es5/util/colors'
          |
          | Vue.use(Vuetify, {
          |   theme: {
          |     primary: colors.red.darken1, // #E53935
          |     secondary: colors.red.lighten4, // #FFCDD2
          |     accent: colors.indigo.base // #3F51B5
          |   }
          | })

      section#stylus-color-pack
        helpers-section-head(:value="`${namespace}.stylusPackHeader`")
        helpers-section-text(:value="`${namespace}.stylusPackText`")
        helpers-markup(lang="stylus").mb-3
          | // src/assets/stylus/main.styl
          |
          | $color-pack = false
          |
          | @import '~vuetify/src/stylus/main'
        helpers-section-text(:value="`${namespace}.stylusPackText2`")
        helpers-markup(lang="js").mb-3
          | // src/index.js
          |
          | import './assets/stylus/main.styl'
          | // or
          | require('./assets/stylus/main.styl')
        core-alert(error :value="`${namespace}.alert`")
        helpers-section-text(:value="`${namespace}.stylusPackText3`")
        helpers-markup(lang="vue")
          | &lt;style lang="stylus"&gt;
          |   $color-pack = false
          |
          |   @import '~vuetify/src/stylus/main'
          | &lt;/style&gt;

      section#material-colors
        helpers-section-head(:value="`${namespace}.colorHeader`")
        helpers-section-text(:value="`${namespace}.colorText`")
        v-container(fluid grid-list-xl).pa-0
          v-layout(row wrap)
            v-flex(xs12).mb-3
              v-text-field(
                prepend-icon="filter_list"
                solo
                label="Search"
                single-line
                v-model="search"
              )
            v-flex(
              xs6 sm6 md4
              v-for="(color, key) in computedColors"
              :key="key"
            )
              v-card(
                :color="key"
                tile
              )
                v-card-text
                  h3 {{ key }}
              v-card(
                v-for="(subColor, key2) in color"
                :color="`${key} ${convertToClass(key2)}`"
                :class="getColorClass(key2)"
                :key="key2"
                tile
              )
                v-card-text
                  v-layout
                    v-flex(xs8).caption
                      span(v-if="key !== 'shades'") {{ key }}&nbsp;
                      span(v-if="key2 !== 'base'") {{ key2.replace(/(.*)(\d)/, '$1-$2') }}
                    v-flex(xs4).text-xs-right
                      span(v-if="subColor !== 'transparent'") {{ subColor.toUpperCase() }}

</template>

<script>
  import colors from 'vuetify/es5/util/colors'
  import { kebab } from '@/util/helpers'

  export default {
    data: () => ({
      colors,
      search: ''
    }),

    computed: {
      computedColors () {
        const colors = {}
        const search = this.search.toLowerCase()

        Object.keys(this.colors).forEach(key => {
          const kebabKey = kebab(key).toLowerCase()

          if (kebabKey.indexOf(search) > -1) {
            colors[kebabKey] = this.colors[key]
          }
        })

        return colors
      }
    },

    methods: {
      endStr (str) {
        return str[str.length - 1]
      },
      convertToClass (str) {
        const end = this.endStr(str)
        const sub = str.substr(0, str.length - 1)

        if (isNaN(parseInt(end))) return str

        return `${sub}-${end}`
      },
      getColorClass (key) {
        if (['white', 'transparent'].includes(key) ||
          key.indexOf('light') > -1 ||
          key.indexOf('accent') > -1
        ) return 'black--text'

        return 'white--text'
      }
    }
  }
</script>

<style lang="stylus">
  #colors-page #colors
    .flex
      margin: 1rem 0

    .v-card
      color: #fff
      font-weight: 500
      letter-spacing: .5px
      padding: 1rem
      border-radius: 0

      .v-card__text
        h3
          color: #fff
          align-self: flex-start
          font-size: 1.5rem
          margin: 0

    .v-card__text
      padding: 0
</style>
