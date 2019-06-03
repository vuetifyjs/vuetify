<template>
  <div>
    <doc-heading>colorHeader</doc-heading>
    <doc-text>colorText</doc-text>

    <v-text-field
      v-model="search"
      append-icon="mdi-palette"
      prepend-inner-icon="mdi-magnify"
      solo
      label="Search"
      single-line
    />

    <v-container fluid pa-0 grid-list-xl>
      <v-layout wrap>
        <v-flex
          v-for="(color, key) in computedColors"
          :key="key"
          xs6
          md4
        >
          <v-card
            :color="key"
            tile
          >
            <v-card-text>
              <span class="title" v-text="key" />
            </v-card-text>
          </v-card>
          <v-card
            v-for="(subColor, key2) in color"
            :key="key2"
            :color="`${key} ${convertToClass(key2)}`"
            :class="getColorClass(key2)"
            tile
          >
            <v-card-text>
              <v-layout>
                <v-flex xs8 caption>
                  <span v-if="key !== 'shades'">{{ key }}&nbsp;</span>
                  <span v-if="key2 !== 'base'">{{ key2.replace(/(.*)(\d)/, '$1-$2') }}</span>
                </v-flex>
                <v-flex xs4 text-xs-right>
                  <span v-if="subColor !== 'transparent'" v-text="subColor.toUpperCase()" />
                </v-flex>
              </v-layout>
            </v-card-text>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import colors from 'vuetify/es5/util/colors'

  export default {
    data: () => ({
      colors,
      search: '',
    }),

    computed: {
      computedColors () {
        const colors = {}
        const search = this.search.toLowerCase()

        Object.keys(this.colors).forEach(key => {
          const kebabKey = kebabCase(key).toLowerCase()

          if (kebabKey.indexOf(search) > -1) {
            colors[kebabKey] = this.colors[key]
          }
        })

        return colors
      },
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
      },
    },
  }
</script>
