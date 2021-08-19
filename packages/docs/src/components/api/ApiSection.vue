<template>
  <div>
    <div class="d-flex mb-2">
      <app-text-field
        clearable
        icon="$mdiMagnify"
        label="Filter"
        @input="filter = $event"
      />
    </div>
    <api-table
      :api-data="apiData"
      class="mb-4"
      :field="section"
      :filter="filter"
    />
  </div>
</template>

<script>
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
      name: String,
      section: String,
    },

    data: () => ({
      filter: null,
      apiData: [],
    }),

    async created () {
      const api = (await getApi(this.name)).default

      if (!api) {
        throw new Error(`API for ${this.name} does not exist`)
      }

      this.apiData = api[this.section] || []
    },
  }
</script>
