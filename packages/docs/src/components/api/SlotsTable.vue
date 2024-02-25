<template>
  <ApiApiTable>
    <template #row="{ props, item }">
      <tr v-bind="props">
        <ApiNameCell section="slots" :name="item.name" :new-in="item.newIn" />
      </tr>

      <tr v-if="item.formatted !== 'never' && item.text !== 'undefined'">
        <AppMarkup :code="item.formatted" language="ts" :rounded="false" />
      </tr>
    </template>
  </ApiApiTable>
</template>
