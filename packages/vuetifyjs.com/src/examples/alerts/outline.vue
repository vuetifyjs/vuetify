<template>
  <div>
    <v-alert
      :value="true"
      color="success"
      icon="check_circle"
      outline
    >
      This is a success alert.
    </v-alert>

    <v-alert
      :value="true"
      color="info"
      icon="info"
      outline
    >
      This is an info alert.
    </v-alert>

    <v-alert
      :value="true"
      color="warning"
      icon="priority_high"
      outline
    >
      This is a warning alert.
    </v-alert>

    <v-alert
      :value="true"
      color="error"
      icon="warning"
      outline
    >
      This is a error alert.
    </v-alert>
  </div>
</template>
