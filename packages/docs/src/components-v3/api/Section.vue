<template>
  <div>
    <!-- <div class="d-flex mb-2">
      <app-text-field
        clearable
        icon="$mdiMagnify"
        label="Filter"
        @input="filter = $event"
      />
    </div> -->
    <api-table
      :api-data="apiData"
      class="mb-4"
      :field="section"
      :filter="filter"
    />
  </div>
</template>

<script>
  import { ref } from 'vue'

  const getApi = name => {
    return import(`../../api/data/${name}.json`)
  }

  export default {
    name: 'ApiSection',
    props: {
      name: String,
      section: String,
    },
    setup (props) {
      const apiData = ref()

      async function fetchApiData () {
        if (apiData.value) return
        console.log('fetching data')
        try {
          const api = (await getApi(props.name)).default
          if (!api[props.section]) {
            throw new Error(`API section "${props.section}" for "${props.name}" does not exist`)
          }
          apiData.value = api[props.section] || []
        } catch (err) {
          console.error(err)
        }
      }

      fetchApiData()

      return {
        filter: ref(),
        apiData,
      }
    },
  }
</script>
