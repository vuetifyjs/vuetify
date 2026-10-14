<template>
  <ApiApiTable>
    <template #row="{ props, item }">
      <tr v-bind="props" role="row">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="slots" />
      </tr>

      <tr v-if="item.formatted !== 'never' && item.text !== 'undefined'" role="row">
        <AppMarkup :code="item.formatted" :rounded="false" language="ts" role="cell" />
      </tr>
    </template>
  </ApiApiTable>
</template>
