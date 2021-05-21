<template>
  <div v-if="inlineApi || name">
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
          :content="field"
          :href="`#api-${field}`"
          :level="name ? '2' : '3'"
        />
        <api-table
          :api-data="apiData"
          class="mb-4"
          :field="field"
          :filter="filter"
          :page="name"
        />
      </v-col>
    </v-row>
  </div>
</template>

<script>
  import { capitalize } from 'lodash'
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
    name: 'ApiSection',

    props: {
      page: String,
      name: String,
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

    async created () {
      const components = this.name ? [this.name] : pageToApi[this.page] || []
      for (const component of components) {
        this.apiComponents.push({
          text: component,
          value: (await getApi(component)).default,
        })
      }
      this.selectedComponent = this.apiComponents[0].value
      if (this.name) {
        this.updateToc()
      }
    },

    methods: {
      updateToc () {
        const headers = Object.keys(this.apiComponent).reduce((acc, header) => {
          acc.push({
            level: 2,
            text: capitalize(header),
            to: `#api-${header}`,
          })
          return acc
        }, [])
        this.toc.push(...headers)
      },
    },

  }
</script>
