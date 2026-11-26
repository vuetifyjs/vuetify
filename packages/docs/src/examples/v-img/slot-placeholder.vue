<template>
  <v-img
    class="mx-auto"
    height="300"
    lazy-src="https://picsum.photos/id/11/100/60"
    max-width="500"
    src="https://bad.src/not/valid"
  >
    <template v-slot:placeholder>
      <div class="d-flex align-center justify-center fill-height">
        <v-progress-circular
          color="grey-lighten-4"
          indeterminate
        ></v-progress-circular>
      </div>
    </template>
  </v-img>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14747-284938"
}
</example-meta>
