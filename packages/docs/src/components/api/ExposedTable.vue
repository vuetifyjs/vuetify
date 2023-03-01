<template>
  <ApiTable>
    <template #row="{ props, ...item }">
      <tr v-bind="props">
        <NameCell section="exposed" :name="item.name" />
      </tr>

      <tr>
        <app-markup
          :code="getType(item)"
          :rounded="false"
          language="ts"
        />
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
