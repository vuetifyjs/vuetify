<template>
  <ApiApiTable :headers="headers">
    <template #row="{ props, item }">
      <tr v-bind="props">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="events" />

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
