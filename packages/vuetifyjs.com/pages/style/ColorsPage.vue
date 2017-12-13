<template lang="pug">
  doc-view
    template(slot-scope="{ namespace }")
      section#classes
        section-head(:value="`${namespace}.classesHeader`")
        section-text(:value="`${namespace}.classesText`")

      section#color-pack
        section-head(:value="`${namespace}.colorPackHeader`")
        section-text(:value="`${namespace}.colorPackText`")

        h3.py-3 {{ $t('Style.Colors.colorPackSubHeader1') }}
        section-text(:value="`${namespace}.colorPackSubText1`")

        h3.py-3 {{ $t('Style.Colors.colorPackSubHeader2') }}
        section-text(:value="`${namespace}.colorPackSubText2`")

      section#colors
        v-container(fluid).pa-0
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
              xs6 sm6 md4 lg3
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
                :class="`${key2.indexOf('light') > -1 ? 'black' : 'white'}--text`"
                :key="key2"
                tile
              )
                v-card-text
                  v-layout
                    v-flex(xs6) {{ key2 }}
                    v-flex(xs6).text-xs-right {{ subColor.toUpperCase() }}

</template>

<script>
  import colors from '@/util/colors'
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
          if (key.indexOf(search) > -1 && key !== 'shades') {
            colors[kebab(key)] = this.colors[key]
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
      }
    }
  }
</script>

<style lang="stylus">
  #colors-page #colors
    .flex
      margin: 1rem 0

    .card
      color: #fff
      font-weight: 500
      letter-spacing: .5px
      padding: 1rem
      border-radius: 0

      .card__text
        h3
          color: #fff
          align-self: flex-start
          font-size: 1.5rem
          margin: 0

    .card__text
      padding: 0
</style>
