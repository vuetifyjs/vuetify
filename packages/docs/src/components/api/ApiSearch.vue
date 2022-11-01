<template>
  <v-autocomplete
    clearable
    item-value="text"
    prepend-inner-icon="$mdiDatabaseSearch"
    variant="solo"
    v-bind="$attrs"
  >
    <template #selection="{ item, selected }">
      <v-chip
        :value="selected"
        class="text-white"
        color="primary"
        label
      >
        <v-icon
          start
          v-text="item.icon"
        />
        <span v-text="item.text" />
      </v-chip>
    </template>

    <template #item="{ attrs, item }">
      <template #prepend>
        <v-icon v-text="item.icon" />
      </template>
      <v-list-item-title
        :id="attrs['aria-labelledby']"
        v-text="item.text"
      />
      <v-list-item-subtitle v-text="$t(item.type)" />
    </template>
  </v-autocomplete>
</template>

<script>
  export default {
    name: 'ApiSearch',
    inheritAttrs: false,
  }
</script>
