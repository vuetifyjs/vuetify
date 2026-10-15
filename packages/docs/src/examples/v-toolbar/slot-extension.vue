<template>
  <v-card height="200">
    <v-toolbar extended>
      <v-toolbar-title text="Toolbar"></v-toolbar-title>

      <template v-slot:extension>
        <v-tabs>
          <v-tab text="Tab 1"></v-tab>
          <v-tab text="Tab 2"></v-tab>
          <v-tab text="Tab 3"></v-tab>
        </v-tabs>
      </template>
    </v-toolbar>
  </v-card>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13970-48507"
}
</example-meta>
