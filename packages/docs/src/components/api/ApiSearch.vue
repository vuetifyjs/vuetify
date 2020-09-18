<template>
  <v-autocomplete
    clearable
    multiple
    prepend-inner-icon="$mdiDatabaseSearch"
    return-object
    solo
    v-bind="$attrs"
    v-on="$listeners"
  >
    <template v-slot:selection="{ item, selected }">
      <v-chip
        :value="selected"
        class="white--text"
        color="primary"
        label
      >
        <v-icon
          left
          v-text="item.icon"
        />
        <span v-text="item.text" />
      </v-chip>
    </template>

    <template v-slot:item="{ attrs, item }">
      <v-list-item-action>
        <v-icon v-text="item.icon" />
      </v-list-item-action>
      <v-list-item-content>
        <v-list-item-title
          :id="attrs['aria-labelledby']"
          v-text="item.text"
        />
        <v-list-item-subtitle v-text="$t(item.type)" />
      </v-list-item-content>
    </template>
  </v-autocomplete>
</template>

<script>
  export default {
    name: 'ApiSearch',
  }
</script>
