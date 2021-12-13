<template>
  <div v-if="apiData?.length">
    <!-- <div class="d-flex mb-2">
      <app-text-field
        clearable
        icon="$mdiMagnify"
        label="Filter"
        @input="filter = $event"
      />
    </div> -->
    <app-headline v-if="showHeadline" :path="`api-headers.${section}`" />
    <api-table
      :api-data="apiData"
      class="mb-4"
      :field="section"
      :filter="filter"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, watch } from 'vue'

  const getApi = (name: string) => {
    return import(`../../api/data/${name}.json`)
  }

  export default defineComponent({
    name: 'ApiSection',

    props: {
      name: {
        type: String,
        required: true,
      },
      section: {
        type: String,
        required: true,
      },
      showHeadline: Boolean,
    },

    setup (props) {
      const apiData = ref()

      async function fetchApiData () {
        try {
          const api = (await getApi(props.name)).default
          if (!api[props.section]) {
            throw new Error(`API section "${props.section}" for "${props.name}" does not exist`)
          }
          apiData.value = api[props.section]
        } catch (err) {
          console.error(err)
        }
      }

      fetchApiData()

      watch(() => props.name, fetchApiData)

      return {
        filter: ref(),
        apiData,
      }
    },
  })
</script>
