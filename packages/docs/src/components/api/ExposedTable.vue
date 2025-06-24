<template>
  <ApiApiTable :headers="headers">
    <template #row="{ props, item }">
      <tr v-bind="props">
        <ApiNameCell :name="item.name" :new-in="item.newIn" section="exposed" />

        <td>
          <AppMarkdown
            v-if="localeStore.locale !== 'eo-UY'"
            :content="item.description"
            class="mb-0"
          />
          <span v-else>{{ item.description }}</span>
        </td>
      </tr>

      <tr>
        <td class="px-0" colspan="2">
          <AppMarkup
            :code="item.formatted"
            :rounded="false"
            language="ts"
          />
        </td>
      </tr>
    </template>
  </ApiApiTable>
</template>

<script setup lang="ts">
  const localeStore = useLocaleStore()
  const headers = ['name', 'description']
</script>
