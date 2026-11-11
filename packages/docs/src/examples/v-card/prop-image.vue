<template>
  <v-card
    class="mx-auto"
    color="surface-variant"
    image="https://cdn.vuetifyjs.com/docs/images/cards/dark-beach.jpg"
    max-width="340"
    subtitle="Take a walk down the beach"
    title="Evening sunset"
  >
    <template v-slot:actions>
      <v-btn
        append-icon="mdi-chevron-right"
        color="red-lighten-2"
        text="Book Activity"
        variant="outlined"
        block
      ></v-btn>
    </template>
  </v-card>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=13717-213273"
}
</example-meta>
