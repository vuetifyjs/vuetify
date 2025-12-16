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
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2766-81686&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>