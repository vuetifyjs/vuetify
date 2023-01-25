<template>
  <section id="material-colors" class="mb-4">
    <v-text-field
      v-model="search"
      append-icon="mdi-palette"
      prepend-inner-icon="mdi-magnify"
      label="Search"
      single-line
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

<script setup lang="ts">
  // Utilities
  import kebabCase from 'lodash/kebabCase'
  import { colors as vuetifyColors } from 'vuetify/lib/util/colors'
  import { computed } from 'vue'

  type Colors = Record<string, Record<string, string>>

  const colors: Colors = vuetifyColors
  const search = ""

  const computedColors: Colors = computed(() => {
    const matchingColors: Colors = {}
    const colorSearch = search.toLowerCase()

    Object.keys(colors).forEach(key => {
      const kebabKey = kebabCase(key).toLowerCase()

      if (kebabKey.indexOf(colorSearch) > -1) {
        matchingColors[kebabKey] = colors[key]
      }
    })

    return colors
  })

  function convertToClass (base: string, variant: string): string {
    if (variant === 'base') return base

    const lastChar = variant.at(-1)

    if (isNaN(Number(lastChar))) return variant

    return `${base}-${variant.slice(0, -1)}-${lastChar}`
  }
</script>
