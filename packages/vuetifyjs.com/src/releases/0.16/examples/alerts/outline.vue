<template>
  <div>
    <v-alert outline color="success" icon="check_circle" :value="true">
      This is a success alert.
    </v-alert>

    <v-alert outline color="info" icon="info" :value="true">
      This is an info alert.
    </v-alert>

    <v-alert outline color="warning" icon="priority_high" :value="true">
      This is a warning alert.
    </v-alert>

    <v-alert outline color="error" icon="warning" :value="true">
      This is a error alert.
    </v-alert>
  </div>
</template>
