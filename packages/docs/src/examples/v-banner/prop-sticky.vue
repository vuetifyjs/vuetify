<template>
  <v-card max-height="300" class="overflow-auto">
    <v-toolbar color="primary">
      <v-toolbar-title>My Document</v-toolbar-title>
      <v-spacer></v-spacer>
      <div>
        <v-switch
          v-model="sticky"
          label="Sticky Banner"
          hide-details
        ></v-switch>
      </div>
    </v-toolbar>
    <v-banner
      lines="one"
      :sticky="sticky"
    >
      We can't save your edits while you are in offline mode.

      <template v-slot:actions>
        <v-btn
          text
          color="deep-purple accent-4"
        >
          Get Online
        </v-btn>
      </template>
    </v-banner>
    <v-card-text class="bg-grey-lighten-4">
      <v-sheet
        height="300"
        class="mx-auto"
      ></v-sheet>
    </v-card-text>
  </v-card>
</template>

<script>
  export default {
    data: () => ({
      sticky: false,
    }),
  }
</script>
