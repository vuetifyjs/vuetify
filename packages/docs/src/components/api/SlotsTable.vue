<template>
  <ApiApiTable>
    <template #row="{ props, item }">
      <tr v-bind="props">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="slots" />
      </tr>

      <tr v-if="item.formatted !== 'never' && item.text !== 'undefined'">
        <td class="pa-0">
          <AppMarkup :code="item.formatted" :rounded="false" language="ts" />
        </td>
      </tr>
    </template>
  </ApiApiTable>
</template>
