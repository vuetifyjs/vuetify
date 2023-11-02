<template>
  <ApiTable>
    <template #row="{ props, item }">
      <tr v-bind="props">
        <NameCell section="slots" :name="item.name" :new-in="item.newIn" />
      </tr>

      <tr v-if="item.formatted !== 'never' && item.text !== 'undefined'">
        <app-markup :code="item.formatted" language="ts" :rounded="false" />
      </tr>
    </template>
  </ApiTable>
</template>

<script setup lang="ts">
  // Components
  import ApiTable from './ApiTable.vue'
  import NameCell from './NameCell.vue'
</script>
