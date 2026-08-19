<template>
  <div class="text-center">
    <v-menu
      :close-on-content-click="false"
      location="bottom center"
      offset="8"
    >
      <template v-slot:activator="{ props }">
        <v-btn v-bind="props">Open Menu</v-btn>
      </template>
      <v-card min-width="200" rounded="lg">
        <div class="d-flex justify-space-between pa-2">
          <v-icon-btn icon="mdi-eye-outline" variant="text" v-tooltip:top="'Preview'" @click=""></v-icon-btn>
          <v-icon-btn icon="mdi-download" variant="text" v-tooltip:top="'Download'" @click=""></v-icon-btn>
          <v-icon-btn icon="mdi-content-copy" variant="text" v-tooltip:top="'Copy file name'" @click=""></v-icon-btn>
          <v-icon-btn icon="mdi-rename-outline" variant="text" v-tooltip:top="'Rename'" @click=""></v-icon-btn>
        </div>
      </v-card>
      <v-card class="mt-2" rounded="lg">
        <v-list class="pa-1" density="compact" prepend-gap="12" nav>
          <v-list-item prepend-icon="mdi-share-variant" title="Share" @click="">
          </v-list-item>
          <v-list-item prepend-icon="mdi-information-outline" title="Details" @click="">
            <template v-slot:append>
              <v-hotkey keys="Alt+D" variant="text"></v-hotkey>
            </template>
          </v-list-item>
          <v-divider class="mt-1"></v-divider>
          <v-list-item prepend-icon="mdi-delete-outline" title="Remove" @click="">
            <template v-slot:prepend>
              <v-icon color="error"></v-icon>
            </template>
            <template v-slot:append>
              <v-hotkey keys="Delete" variant="text"></v-hotkey>
            </template>
          </v-list-item>
        </v-list>
      </v-card>
    </v-menu>
  </div>
</template>
