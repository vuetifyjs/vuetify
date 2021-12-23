<template>
  <div>
    <v-alert
      density="compact"
      type="info"
      class="ma-2"
    >
      I'm a dense alert with a <strong>type</strong> of info
    </v-alert>
    <v-alert
      density="compact"
      variant="text"
      type="success"
      class="ma-2"
    >
      I'm a dense alert with the <strong>text</strong> prop and a <strong>type</strong> of success
    </v-alert>
    <v-alert
      density="compact"
      border="start"
      type="warning"
      class="ma-2"
    >
      I'm a dense alert with the <strong>border</strong> prop and a <strong>type</strong> of warning
    </v-alert>
    <v-alert
      density="compact"
      variant="outlined"
      type="error"
      class="ma-2"
    >
      I'm a dense alert with the <strong>outlined</strong> prop and a <strong>type</strong> of error
    </v-alert>
  </div>
</template>
