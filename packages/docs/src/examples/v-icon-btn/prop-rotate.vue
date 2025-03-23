<template>
  <v-menu>
    <template #activator="{ props: activatorProps, isActive }">
      <v-btn v-bind="activatorProps" text="Toggle">
        <template #append>
          <v-icon-btn
            icon="$dropdown"
            size="16"
            :rotate="isActive ? 180 : 0"
            opacity="var(--v-medium-emphasis-opacity)"
          ></v-icon-btn>
        </template>
      </v-btn>
    </template>

    <v-list>
      <v-list-item title="Item 1" link></v-list-item>
      <v-list-item title="Item 2" link></v-list-item>
      <v-list-item title="Item 3" link></v-list-item>
    </v-list>
  </v-menu>
</template>

<script setup>
  //
</script>
