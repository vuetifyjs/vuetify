<template>
  <ApiTable>
    <template #row="{ props, ...item }">
      <tr v-bind="props">
        <NameCell section="slots" :name="item.name" />
      </tr>

      <tr v-if="item.formatted !== 'never' && item.text !== 'undefined'">
        <app-markup :code="getType(item)" language="ts" :rounded="false" />
      </tr>
    </template>
  </ApiTable>
</template>

<script setup lang="ts">
  // Components
  import ApiTable from './ApiTable.vue'
  import NameCell from './NameCell.vue'

  // Utilities
  import { getType } from './utils'
</script>
