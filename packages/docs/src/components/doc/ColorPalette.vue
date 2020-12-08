<template>
  <section id="material-colors">
    <v-text-field
      v-model="search"
      append-icon="mdi-palette"
      prepend-inner-icon="mdi-magnify"
      solo
      label="Search"
      single-line
    />

    <v-container
      class="pa-0"
      fluid
    >
      <v-row>
        <v-col
          v-for="(color, key) in computedColors"
          :key="key"
          cols="12"
          md="6"
          lg="4"
        >
          <v-card
            :color="key"
            outlined
            tile
          >
            <v-card-text>
              <span
                class="title"
                v-text="key"
              />
            </v-card-text>
          </v-card>

          <v-card
            v-for="(subColor, key2) in color"
            :key="key2"
            :color="`${key} ${convertToClass(key2)}`"
            flat
            tile
          >
            <v-card-text :class="getColorClass(key2)">
              <v-row>
                <v-col
                  cols="8"
                  class="caption"
                >
                  <span v-if="key !== 'shades'">{{ key }}&nbsp;</span>

                  <span v-if="key2 !== 'base'">{{ key2.replace(/(.*)(\d)/, '$1-$2') }}</span>
                </v-col>

                <v-col
                  cols="4"
                  class="text-right"
                >
                  <span
                    v-if="subColor !== 'transparent'"
                    v-text="subColor.toUpperCase()"
                  />
                </v-col>
              </v-row>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </section>
</template>

<script>
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import colors from 'vuetify/es5/util/colors'

  export default {
    name: 'ColorPalette',

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
