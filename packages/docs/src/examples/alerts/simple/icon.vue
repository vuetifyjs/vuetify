<template>
  <div>
    <v-alert
      type="info"
      icon="new_releases"
      prominent
    >
      This is an info alert with a custom icon.
    </v-alert>

    <v-alert
      type="error"
      dense
      :icon="false"
    >
      This is an error alert with no icon.
    </v-alert>
  </div>
</template>
