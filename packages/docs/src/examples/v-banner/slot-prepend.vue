<template>
  <v-banner
    color="deep-purple-accent-4"
    lines="two"
  >
    <template v-slot:prepend>
      <v-avatar
        color="deep-purple-accent-4"
        icon="mdi-account-filter"
      ></v-avatar>
    </template>

    <v-banner-text>
      Banner with two lines of text. If the text is too long to fit on two lines then an ellipsis will be used to hide the remaining content. So this next line will be hidden.
    </v-banner-text>

    <v-banner-actions>
      <v-btn>Action</v-btn>

      <v-btn>Action</v-btn>
    </v-banner-actions>
  </v-banner>
</template>

<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14445-57297"
  }
</example-meta>
