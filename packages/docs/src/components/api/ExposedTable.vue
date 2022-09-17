<template>
  <div>
    <template v-for="item in items" :key="item.name">
      <v-card class="mb-4" variant="outlined" color="grey-lighten-1">
        <template #title>
          <div class="d-flex justify-space-between">
            <NameCell section="exposed" :name="item.name" />
            <kbd class="text-mono">{{ item.type }}</kbd>
          </div>
        </template>
        <v-card-text>
          <app-markdown v-if="item.description" :content="item.description" />
        </v-card-text>
        <v-card-text v-if="item.formatted !== 'never'" class="pt-0">
          <app-markup :code="getType(item)" language="ts" resource="props" />
        </v-card-text>
      </v-card>
    </template>
  </div>
</template>

<script lang="ts">
  // Imports
  import { defineComponent, PropType } from 'vue'
  import { getType } from './utils'
  import NameCell from './NameCell.vue'
  import TypescriptCell from './TypescriptCell.vue'

  export default defineComponent({
    components: {
      NameCell,
      TypescriptCell,
    },
    props: {
      items: {
        type: Array as PropType<any[]>,
        default: () => [],
      },
    },
    setup (props) {
      const headers = ['name', 'type', 'description']

      return {
        headers,
        field: 'props',
        getType,
      }
    },
  })
</script>
