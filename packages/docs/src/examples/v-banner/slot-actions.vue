<template>
  <v-banner
    color="warning"
    icon="mdi-wifi-strength-alert-outline"
    lines="one"
  >
    <template v-slot:text>
      No Internet connection
    </template>

    <template v-slot:actions>
      <v-btn>
        Dismiss
      </v-btn>

      <v-btn>
        Retry
      </v-btn>
    </template>
  </v-banner>
</template>
<example-meta lang="json">
  {
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14445-57095"
  }
</example-meta>
