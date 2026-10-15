<template>
  <v-card
    class="overflow-auto mx-auto"
    max-height="300"
    width="448"
  >
    <v-toolbar color="primary">
      <v-toolbar-title>My Document</v-toolbar-title>

      <template v-slot:append>
        <v-switch
          v-model="sticky"
          color="secondary"
          label="Sticky Banner"
          hide-details
        ></v-switch>
      </template>
    </v-toolbar>

    <v-banner
      :sticky="sticky"
      lines="one"
    >
      <template v-slot:text>
        We can't save your edits while you are in offline mode.
      </template>

      <template v-slot:actions>
        <v-btn color="deep-purple-accent-4">
          Go Online
        </v-btn>
      </template>
    </v-banner>

    <v-card-text class="bg-grey-lighten-4">
      <v-sheet
        class="mx-auto"
        height="300"
      ></v-sheet>
    </v-card-text>

    <v-footer
      class="justify-center"
      color="primary"
    >
      End of Content
    </v-footer>
  </v-card>
</template>

<script setup>
  import { ref } from 'vue'

  const sticky = ref(false)
</script>

<script>
  export default {
    data: () => ({
      sticky: false,
    }),
  }
</script>

<example-meta lang="json">
{
  "figma": "https://www.figma.com/design/5f4g4pbbBsk9TTWX4Xvlx1/PRO-v4---Official-Vuetify-4---UI-Kit---Snips?node-id=14445-56994"
}
</example-meta>
