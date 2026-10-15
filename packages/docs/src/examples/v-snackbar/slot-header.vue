<template>
  <v-layout min-height="120">
    <v-snackbar
      max-width="400"
      prepend-avatar="https://cdn.vuetifyjs.com/images/lists/2.jpg"
      text="The reproduction is missing. Would you..."
      timeout="-1"
      title="@marley4122"
      contained
      model-value
    >
      <template v-slot:header>
        <div class="d-flex text-body-small pa-3 pb-0">
          <div class="text-uppercase">Signal</div>
          <v-spacer></v-spacer>
          <div>2 min ago</div>
        </div>
      </template>
    </v-snackbar>
  </v-layout>
</template>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14461-112943"
}
</example-meta>
