<template>
  <div class="text-center">
    <v-progress
      details-position="bottom"
      label="Syncing contacts"
      hide-value
      indeterminate
    >
      <v-loading-indicator
        aria-hidden="true"
        color="primary"
        contained
      ></v-loading-indicator>
    </v-progress>
  </div>
</template>
