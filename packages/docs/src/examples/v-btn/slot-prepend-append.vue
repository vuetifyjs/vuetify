<template>
  <div class="text-center">
    <v-btn
      append-icon="mdi-account-circle"
      prepend-icon="mdi-check-circle"
    >
      <template v-slot:prepend>
        <v-icon color="success"></v-icon>
      </template>

      Button

      <template v-slot:append>
        <v-icon color="warning"></v-icon>
      </template>
    </v-btn>
  </div>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=1481-93004&t=tWnPBMI0RfGlNRgq-4"
  }
</example-meta>