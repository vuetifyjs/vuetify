<template>
  <ApiApiTable :headers="headers">
    <template #row="{ props, item }">
      <tr v-bind="props">
        <ApiNameCell section="events" :name="item.name" :new-in="item.newIn" />

        <td>
          <ApiPrismCell :code="item.formatted" />
        </td>
      </tr>
    </template>
  </ApiApiTable>
</template>

<script setup lang="ts">
  const headers = ['name', 'type']
</script>
