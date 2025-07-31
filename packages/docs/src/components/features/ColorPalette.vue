<template>
  <section id="material-colors" class="mb-4">
    <AppTextField
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
          lg="4"
          md="6"
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
                  class="text-caption"
                  cols="7"
                >
                  {{ convertToClass(key, key2) }}
                </v-col>

                <v-col
                  class="text-right"
                  cols="5"
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

<script setup>
  import colors from 'vuetify/util/colors'

  const search = shallowRef('')

  const computedColors = computed(() => {
    const _colors = {}
    const _search = search.value.toLowerCase()

    Object.keys(colors).forEach(key => {
      const kebabKey = kebabCase(key).toLowerCase()

      if (kebabKey.indexOf(_search) > -1) {
        _colors[kebabKey] = colors[key]
      }
    })

    return _colors
  })

  function convertToClass (base, variant) {
    if (variant === 'base') return base

    const lastChar = variant.at(-1)

    if (isNaN(Number(lastChar))) return variant

    return `${base}-${variant.slice(0, -1)}-${lastChar}`
  }
</script>
