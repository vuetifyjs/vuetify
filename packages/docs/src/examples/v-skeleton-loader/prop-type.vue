<template>
  <v-container>
    <v-row>
      <v-col cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="card-avatar, actions"
        ></v-skeleton-loader>
      </v-col>

      <v-col cols="12" md="6">
        <v-skeleton-loader
          class="mx-auto border"
          max-width="300"
          type="image, article"
        ></v-skeleton-loader>
      </v-col>
    </v-row>
  </v-container>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-107880"
  }
</example-meta>
