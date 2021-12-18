<template>
  <div v-if="inlineApi">
    <v-row
      class="mb-2"
      justify="space-between"
      no-gutters
    >
      <v-col
        class="mt-2"
        cols="12"
        sm="5"
        md="4"
      >
        <app-select
          v-if="apiComponents.length > 1"
          :value="selectedComponent"
          icon="$mdiViewDashboardOutline"
          :items="apiComponents"
          @input="selectedComponent = $event"
        />
      </v-col>
      <v-col
        class="mt-2"
        cols="12"
        sm="5"
        md="4"
      >
        <app-text-field
          clearable
          icon="$mdiMagnify"
          label="Filter"
          @input="filter = $event"
        />
      </v-col>
    </v-row>
    <v-row
      v-for="(apiData, field) in apiComponent"
      :key="field"
      cols="12"
      no-gutters
    >
      <v-col>
        <app-heading
          :id="`api-${field}`"
          class="text-capitalize"
          :content="$t(`api-headers.${field}`)"
          :href="`#api-${field}`"
          level="3"
        />
        <api-table
          :api-data="apiData"
          class="mb-4"
          :field="field"
          :filter="filter"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { get, sync } from 'vuex-pathify'
  import pageToApi from '@/data/page-to-api'

  const getApi = name => {
    return import(
      /* webpackChunkName: "api-data" */
      /* webpackMode: "eager" */
      `@/api/data/${name}.js`
    )
  }

  export default {
    name: 'InlineApi',

    props: {
      page: String,
    },

    data: () => ({
      apiComponents: [],
      selectedComponent: {},
      filter: null,
    }),

    computed: {
      inlineApi: get('user/api'),
      toc: sync('pages/toc'),
      apiComponent () {
        return Object.keys(this.selectedComponent)
          .filter(key => !['component', 'mixins', 'name'].includes(key))
          .reduce((obj, key) => {
            if (this.selectedComponent[key].length) {
              obj[key] = this.selectedComponent[key]
            }
            return obj
          }, {})
      },
    },

    watch: {
      inlineApi: 'updateToc',
    },

    async created () {
      const components = pageToApi[this.page] || []

      if (!components.length) {
        throw new Error(`API for ${this.name || this.page} does not exist`)
      }

      for (const component of components) {
        this.apiComponents.push({
          text: component,
          value: (await getApi(component)).default,
        })
      }
      this.selectedComponent = this.apiComponents[0].value

      this.updateToc()
    },

    methods: {
      updateToc () {
        if (this.inlineApi) {
          const apiIndex = this.toc.findIndex(item => item.to === '#api')
          this.toc = [
            ...this.toc.slice(0, apiIndex + 1),
            ...Object.keys(this.apiComponent).map(key => ({
              level: 3,
              text: this.$t(`api-headers.${key}`),
              to: `#api-${key}`,
            })),
            ...this.toc.slice(apiIndex + 1),
          ]
        } else {
          const ids = Object.keys(this.apiComponent).map(key => `#api-${key}`)
          this.toc = this.toc.filter(item => !ids.includes(item.to))
        }
      },
    },

  }
</script>
