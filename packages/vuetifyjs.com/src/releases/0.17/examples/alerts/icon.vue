<template>
  <div>
    <v-alert color="success" icon="new_releases" :value="true">
      This is a success alert with a custom icon.
    </v-alert>

    <v-alert color="error" :value="true">
      This is an error alert with no icon.
    </v-alert>
  </div>
</template>
