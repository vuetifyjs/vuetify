<template>
  <ApiApiTable :headers="headers">
    <template #row="{ props, item }">
      <tr v-bind="props">
        <!-- Name -->
        <ApiNameCell :name="kebabCase(item.name)" :new-in="item.newIn" section="props" />

        <!-- Type -->
        <td>
          <ApiPrismCell :code="item.formatted" />
        </td>

        <!-- Default -->
        <td>
          <ApiPrismCell :code="item.default" />
        </td>

        <!-- Description -->
        <td>
          <div style="min-width: 300px">
            <AppMarkdown
              v-if="localeStore.locale !== 'eo-UY'"
              :content="item.description"
            />
            <span v-else>{{ item.description }}</span>
          </div>
        </td>
      </tr>
    </template>
  </ApiApiTable>
</template>

<script setup lang="ts">
  const localeStore = useLocaleStore()
  const headers = ['name', 'type', 'default', 'description']
</script>
