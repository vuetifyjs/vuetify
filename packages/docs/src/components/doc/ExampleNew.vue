<template>
  <v-card
    class="mx-auto overflow-hidden example-new"
    max-width="1200"
    outlined
  >

    <v-row no-gutters>
      <v-col cols="12" md="9">
        <div class="d-flex">
          <v-tabs
            v-model="tab"
            class="pl-0 pl-md-6"
            color="primary"
          >
            <v-tab
              v-for="(t) in tabs"
              :key="t"
              :value="t"
              v-text="t"
            />
          </v-tabs>

          <v-divider vertical />
        </div>

        <div v-if="component" class="d-flex child-flex">
          <v-sheet
            color="grey lighten-5"
            height="300"
            tile
          >
            <div class="fill-height" data-app="true">
              <component :is="component" :attrs="attrs$" />
            </div>
          </v-sheet>

          <v-divider
            class="hidden-sm-and-down shrink"
            vertical
          />
        </div>
      </v-col>

      <v-col cols="12" md="3">
        <v-responsive
          class="title font-weight-regular d-flex align-center px-3"
          height="48"
        >
          Options
        </v-responsive>

        <v-divider />

        <v-responsive max-height="300" class="overflow-y-auto py-3">
          <v-col
            v-for="(v1, boolean, i) in booleans"
            :key="`col-1-${i}`"
            cols="12"
            class="pb-0"
          >
            <v-switch
              v-model="booleans[boolean]"
              class="mt-0"
              hide-details
              inset
            >
              <template v-slot:label>
                <span
                  class="text-capitalize"
                  v-text="boolean"
                />
              </template>
            </v-switch>
          </v-col>

          <v-col
            v-for="(v2, slider, i) in sliders"
            :key="`col-2-${i}`"
            cols="12"
            class="pb-0"
          >
            <v-slider
              v-model="sliders[slider]"
              hide-details
              min="0"
              max="24"
            >
              <template v-slot:label>
                <span
                  class="text-capitalize"
                  v-text="slider"
                />
              </template>
            </v-slider>
          </v-col>

          <v-col
            v-for="(select, i) in value.selects"
            :key="`col-3-${i}`"
            cols="12"
            class="pb-0"
          >
            <v-select
              v-model="selects[select.prop]"
              v-bind="select.attrs"
              clearable
              dense
              :hide-details="i + 1 !== value.selects.length"
              filled
            >
              <template v-slot:label>
                <span
                  class="text-capitalize"
                  v-text="select.label"
                />
              </template>
            </v-select>
          </v-col>
        </v-responsive>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
  // Utilities
  import {
    mapGetters,
  } from 'vuex'
  import kebabCase from 'lodash/kebabCase'

  function setupData (values = []) {
    return values.reduce((acc, cur) => {
      if (Object(cur) !== cur) {
        acc[cur] = null
        return acc
      }

      acc[cur.prop] = null

      return acc
    }, {})
  }

  export default {
    name: 'ExampleNew',

    props: {
      value: {
        type: Object,
        default: () => ({
          booleans: [],
          sliders: [],
          selects: [],
          tabs: [],
        }),
      },
    },

    data () {
      return {
        booleans: setupData(this.value.booleans),
        component: null,
        selects: setupData(this.value.selects),
        sliders: setupData(this.value.sliders),
        tab: 0,
        tabs: this.value.tabs,
      }
    },

    computed: {
      ...mapGetters('documentation', [
        'page',
      ]),
      attrs$ () {
        const attrs = {}

        attrs[this.tabs[this.tab]] = true

        this.parseAttrs(this.booleans, attrs)
        this.parseAttrs(this.sliders, attrs)
        this.parseAttrs(this.selects, attrs)

        return attrs
      },
      file () {
        return `${this.kebabCase(this.page)}`
      },
    },

    mounted () {
      this.importComponent()
    },

    methods: {
      importComponent () {
        return import(
          /* webpackChunkName: "playgrounds" */
          `../../examples/buttons/playground.vue`
        )
          .then(comp => (this.component = comp.default))
      },
      kebabCase,
      parseAttrs (values, attrs) {
        for (const key in values) {
          const value = values[key]

          if (Object(value) === value) this.parseAttrs(attrs, value)
          else attrs[key] = value
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
</style>
