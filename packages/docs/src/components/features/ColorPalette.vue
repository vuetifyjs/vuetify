<template>
  <section id="material-colors" class="mb-4">
    <app-text-field
      v-model="search"
      class="mb-4"
    />

    <v-container
      class="pa-0"
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
            elevation="0"
            rounded="0"
          >
            <v-card-text>
              <span
                class="text-h6"
                v-text="key"
              />
            </v-card-text>
          </v-card>

          <v-card
            v-for="(subColor, key2) in color"
            :key="key2"
            :color="convertToClass(key, key2)"
            elevation="0"
            rounded="0"
          >
            <v-card-text>
              <v-row>
                <v-col
                  cols="7"
                  class="text-caption"
                >
                  {{ convertToClass(key, key2) }}
                </v-col>

                <v-col
                  cols="5"
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
  import colors from 'vuetify/lib/util/colors'

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
      convertToClass (base, variant) {
        if (variant === 'base') return base

        const lastChar = variant.at(-1)

        if (isNaN(Number(lastChar))) return variant

        return `${base}-${variant.slice(0, -1)}-${lastChar}`
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
