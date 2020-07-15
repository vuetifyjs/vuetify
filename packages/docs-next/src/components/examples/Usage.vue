<template>
  <v-lazy
    min-height="498"
  >
    <v-card
      class="mb-12"
      outlined
    >
      <v-row no-gutters>
        <v-col
          cols="12"
          md="8"
        >
          <v-responsive
            :class="headerColor"
            class="d-flex"
            height="44"
          >
            <v-slide-group
              active-class="primary--text"
              multiple
              show-arrows="mobile"
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
              v-if="file"
              class="overflow-y-auto fill-height d-flex align-center justify-center pa-4"
              min-height="400"
              max-height="400"
              rounded="t"
            >
              <vue-file
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
          <div
            :class="headerColor"
            class="d-flex align-center"
          >
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

          <v-responsive
            class="overflow-y-auto pa-3"
            height="100%"
            max-height="400"
            min-height="400"
          >
            <v-switch
              v-for="(prop, i) in booleans"
              :key="prop"
              v-model="usageProps[prop]"
              :class="i === 0 && 'mt-0'"
              :label="prop"
              dense
              hide-details
            />

            <v-slider
              v-for="([min, max, step], prop) in sliders"
              :key="prop"
              v-model="usageProps[prop]"
              :label="prop"
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
              :label="prop"
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
          </v-responsive>
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
    </v-card>
  </v-lazy>
</template>

<script>
  // Mixins
  import Codepen from '@/mixins/codepen'

  // Utilities
  import { get } from 'vuex-pathify'

  export default {
    name: 'Usage',

    inject: ['theme'],

    mixins: [Codepen],

    props: { name: String },

    data: () => ({
      booleans: undefined,
      btnToggles: undefined,
      dark: false,
      hasError: false,
      options: {},
      file: null,
      selects: undefined,
      sliders: undefined,
      tab: null,
      tabs: [],
      usageProps: {},
    }),

    computed: {
      initializing: get('app/initializing'),
      formatAttributes () {
        const attributeArray = []
        for (const [key, value] of Object.entries(this.usageProps)) {
          if (!!value === false) continue
          if (value === true) {
            attributeArray.push(key.trim())
          } else {
            attributeArray.push(`${key.trim()}="${value}"`)
          }
        }

        const indent = attributeArray.length ? '\r\t' : ''
        const tail = `${attributeArray.length ? '\r' : ''}></${this.name}>`

        return `<${this.name}${indent}${attributeArray.join('\r\t')}${tail}`
      },
      headerColor () {
        return this.theme.isDark ? 'grey darken-4' : 'grey lighten-3'
      },
    },

    mounted () {
      setTimeout(() => {
        this.file = `${this.name}/usage`
      }, 1500)
    },

    methods: {
      setContents (component) {
        if (!component) return

        const data = component.data()

        this.usageProps = Object.assign({}, data.defaults)
        this.tabs = data.tabs

        for (const [key, value] of Object.entries(data.options)) {
          this[key] = value
        }
      },
    },
  }
</script>
