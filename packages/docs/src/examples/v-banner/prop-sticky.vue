<template>
  <v-card
    class="overflow-auto mx-auto"
    max-height="300"
    width="448"
  >
    <v-toolbar color="primary">
      <v-toolbar-title>My Document</v-toolbar-title>

      <v-spacer></v-spacer>

      <template v-slot:append>
        <v-switch
          v-model="sticky"
          label="Sticky Banner"
          hide-details
          color="secondary"
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

<script>
  export default {
    data: () => ({
      sticky: false,
    }),
  }
</script>
