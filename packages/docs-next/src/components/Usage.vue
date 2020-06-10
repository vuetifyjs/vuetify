<template>
  <v-card
    class="mb-9"
    outlined
  >
    <v-row no-gutters>
      <v-col
        cols="12"
        md="8"
      >
        <div :class="`d-flex ${headerColor}`">
          <v-slide-group
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
                active-class="primary white--text"
                tile
                text
                height="44"
                depressed
                @click="toggle(); usageProps[prop] = !active;"
              >
                {{ prop }}
              </v-btn>
            </v-slide-item>
          </v-slide-group>
        </div>

        <v-divider />

        <v-fade-transition
          v-if="file"
          appear
        >
          <v-sheet
            :dark="dark"
            class="d-inline-block"
            width="100%"
            height="300"
            style="overflow-y: auto;"
            tile
          >
            <div class="fill-height pa-6 d-flex align-center">
              <vue-file
                v-bind="{ ...usageProps }"
                :file="file"
                @loaded="setContents"
              />
            </div>
          </v-sheet>
        </v-fade-transition>
      </v-col>

      <v-col
        cols="12"
        md="4"
      >
        <div :class="`d-flex ${headerColor}`">
          <v-responsive
            class="title font-weight-regular align-center px-3"
          >
            Options
          </v-responsive>
          <div class="pa-1">
            <app-tooltip-btn
              icon="$mdiInvertColors"
              tooltip="Invert example colors"
              @click="dark = !dark"
            />
          </div>
        </div>

        <v-divider />

        <v-responsive
          max-height="300"
          class="overflow-y-auto text-capitalize pa-3"
        >
          <v-switch
            v-for="prop in booleans"
            :key="prop"
            v-model="usageProps[prop]"
            dense
            hide-details
            class="mt-0 mb-2"
            :label="prop"
          />

          <v-slider
            v-for="(bounds, prop) in sliders"
            :key="prop"
            v-model="usageProps[prop]"
            hide-details
            class="my-2"
            :label="prop"
            :max="bounds[1]"
            :min="bounds[0]"
          />

          <v-select
            v-for="(items, prop) in selects"
            :key="prop"
            v-model="usageProps[prop]"
            clearable
            dense
            filled
            class="my-2"
            hide-details
            :items="items"
            :label="prop"
          />
        </v-responsive>
      </v-col>

      <v-col cols="12">
        <v-divider />
      </v-col>

      <v-col cols="12">
        <h5 class="pa-1">
          Output:
        </h5>
        <markup :code="formatAttributes" />
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  export default {
    name: 'Usage',

    data: () => ({
      booleans: undefined,
      component: undefined,
      dark: false,
      file: undefined,
      options: {},
      selects: undefined,
      sliders: undefined,
      tab: null,
      tabs: [],
      usageProps: {},
    }),

    computed: {
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
        const tail = `${attributeArray.length ? '\r' : ''}></${this.compName}>`
        return `<${this.compName}${indent}${attributeArray.join('\r\t')}${tail}`
      },
      headerColor () {
        return this.$vuetify.theme.dark ? 'grey darken-4' : 'grey lighten-3'
      },

    },

    mounted () {
      const name = this.$attrs.name
      this.compName = name
      this.file = `${name}/usage`
    },

    methods: {
      setContents (contents) {
        const data = contents.component.data()
        this.usageProps = Object.assign({}, data.defaults)
        this.tabs = data.tabs
        for (const [key, value] of Object.entries(data.options)) {
          this[key] = value
        }
      },
    },
  }
</script>

<style lang="sass">
  .example-new
    .v-tabs
      border-bottom: thin solid rgba(0, 0, 0, 0.12) !important
      border-bottom-left-radius: 0 !important
      border-bottom-right-radius: 0 !important

      &.theme--dark
        border-bottom: thin solid rgba(255, 255, 255, 0.12) !important
</style>
