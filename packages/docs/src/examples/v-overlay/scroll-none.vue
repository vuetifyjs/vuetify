<template>
  <div class="d-flex justify-center">
    <v-btn>
      None

      <v-overlay
        activator="parent"
        location-strategy="connected"
        scroll-strategy="none"
      >
        <v-card class="pa-2">
          Hello!
        </v-card>
      </v-overlay>
    </v-btn>
  </div>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13963-42526"
}
</example-meta>
