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
    "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v3.0---Official-Vuetify-3-UI-Kit?node-id=2239-85204&t=tC3y53U3XKPv8ZyJ-4"
  }
</example-meta>