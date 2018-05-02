<template>
  <div>
    <v-alert :value="true" outline color="success" icon="check_circle">
      This is a success alert.
    </v-alert>

    <v-alert :value="true" outline color="info" icon="info">
      This is an info alert.
    </v-alert>

    <v-alert :value="true" outline color="warning" icon="priority_high">
      This is a warning alert.
    </v-alert>

    <v-alert :value="true" outline color="error" icon="warning">
      This is a error alert.
    </v-alert>
  </div>
</template>
