<template>
  <div>
    <v-alert
      :value="true"
      color="success"
      icon="new_releases"
    >
      This is a success alert with a custom icon.
    </v-alert>

    <v-alert
      :value="true"
      color="error"
    >
      This is an error alert with no icon.
    </v-alert>
  </div>
</template>
