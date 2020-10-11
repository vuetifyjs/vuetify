<template>
  <v-lazy min-height="498">
    <app-sheet class="mb-12">
      <v-row no-gutters>
        <v-col
          cols="12"
          md="8"
        >
          <v-responsive
            class="d-flex"
            height="44"
          >
            <v-slide-group
              v-if="tabs.length"
              active-class="primary--text"
              multiple
              show-arrows="always"
            >
              <v-slide-item
                v-for="(prop) in tabs"
                :key="prop"
                #default="{ active, toggle }"
              >
                <v-btn
                  :input-value="active"
                  depressed
                  height="44"
                  text
                  tile
                  @click="toggle(); usageProps[prop] = !active;"
                >
                  {{ prop }}
                </v-btn>
              </v-slide-item>
            </v-slide-group>
          </v-responsive>

          <v-divider />

          <v-theme-provider :dark="dark">
            <v-sheet
              :color="color"
              class="overflow-y-auto fill-height d-flex align-center justify-center pa-4"
              min-height="400"
              max-height="400"
              rounded="t"
            >
              <vue-file
                v-if="file"
                ref="usage"
                :file="file"
                v-bind="{ ...usageProps }"
                @loaded="setContents"
                @error="hasError = true"
              />
            </v-sheet>
          </v-theme-provider>
        </v-col>

        <v-col
          cols="12"
          md="4"
        >
          <div class="d-flex align-center">
            <v-divider vertical />

            <headline
              class="px-3"
              path="options"
            />

            <div class="pa-1 ms-auto">
              <app-tooltip-btn
                :disabled="hasError"
                icon="$mdiInvertColors"
                path="invert-example-colors"
                @click="dark = !dark"
              />
            </div>
          </div>

          <v-divider />

          <div class="d-flex">
            <v-divider vertical />

            <v-responsive
              class="overflow-y-auto pa-3"
              height="100%"
              max-height="400"
              min-height="400"
            >
              <v-checkbox
                v-for="(prop, i) in booleans"
                :key="prop"
                v-model="usageProps[prop]"
                :class="i === 0 && 'mt-0'"
                :label="startCase(prop)"
                dense
                hide-details
                inset
              />

              <v-slider
                v-for="([min, max, step], prop) in sliders"
                :key="prop"
                v-model="usageProps[prop]"
                :label="startCase(prop)"
                :max="max"
                :min="min"
                :step="step || 1"
                class="my-2"
                hide-details
              />

              <v-select
                v-for="(items, prop) in selects"
                :key="prop"
                v-model="usageProps[prop]"
                :items="items"
                :label="startCase(prop)"
                class="my-2"
                clearable
                dense
                filled
                hide-details
              />

              <v-btn-toggle
                v-for="(items, prop) in btnToggles"
                :key="prop"
                class="my-2"
              >
                <v-btn
                  v-for="(item, i) in items"
                  :key="`${prop}${i}`"
                  text
                  @click="() => usageProps[prop] = item"
                >
                  {{ item }}
                </v-btn>
              </v-btn-toggle>

              <v-radio-group
                v-for="(items, prop) in radioGroups"
                :key="prop"
                :label="startCase(prop)"
              >
                <v-radio
                  v-for="item in items"
                  :key="item"
                  :label="item"
                  @click="toggleRadioProp(items, item)"
                />
              </v-radio-group>
            </v-responsive>
          </div>
        </v-col>

        <v-col cols="12">
          <v-divider />
        </v-col>

        <v-col cols="12">
          <markup
            :code="formatAttributes"
            rounded="b"
          />
        </v-col>
      </v-row>
    </app-sheet>
  </v-lazy>
</template>

<script>
  // Mixins
  import Codepen from '@/mixins/codepen'

  // Utilities
  import startCase from 'lodash/startCase'

  export default {
    name: 'Usage',

    inject: ['theme'],

    mixins: [Codepen],

    props: { name: String },

    data: () => ({
      booleans: undefined,
      btnToggles: undefined,
      radioGroups: undefined,
      dark: false,
      file: null,
      hasError: false,
      options: {},
      selects: undefined,
      sliders: undefined,
      tab: null,
      tabs: [],
      usageProps: {},
    }),

    computed: {
      color () {
        return (this.dark || this.theme.isDark)
          ? undefined
          : 'grey lighten-5'
      },
      formatAttributes () {
        let attributeArray = []
        for (const [key, value] of Object.entries(this.usageProps)) {
          if (!!value === false) continue

          let trimmed = key.trim()

          if (value !== true) trimmed += `="${value}"`

          attributeArray.push(trimmed)
        }

        attributeArray = attributeArray.sort()

        const indent = attributeArray.length ? '\r  ' : ''
        const tail = `${attributeArray.length ? '\r' : ''}></${this.name}>`

        return `<${this.name}${indent}${attributeArray.join('\r  ')}${tail}`
      },
    },

    mounted () {
      this.file = `${this.name}/usage`
    },

    methods: {
      startCase,
      setContents (component) {
        if (!component) return

        const data = component.data()

        this.usageProps = Object.assign({}, data.defaults)

        for (const [key, value] of Object.entries(data.options)) {
          this[key] = value
        }

        this.tabs = data.tabs
      },
      toggleRadioProp (props, toggled) {
        for (const prop of props) {
          this.usageProps[prop] = false
        }
        this.usageProps[toggled] = true
      },
    },
  }
</script>
