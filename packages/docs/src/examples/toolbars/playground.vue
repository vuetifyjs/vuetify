<template>
  <div>
    <v-layout row wrap justify-space-around>
      <v-switch v-model="extended" class="mx-2" label="Extended"></v-switch>
      <v-switch v-model="extendedSlot" class="mx-2" label="Extension slot"></v-switch>
      <v-switch v-model="prominent" class="mx-2" label="Prominent"></v-switch>
      <v-switch v-model="dense" class="mx-2" label="Dense"></v-switch>
      <v-switch v-model="collapse" class="mx-2" label="Collapse"></v-switch>
      <v-switch v-model="flat" class="mx-2" label="Flat"></v-switch>
      <v-switch v-model="bg" class="mx-2" label="Background"></v-switch>
      <v-flex xs12>
        <v-slider v-model="extensionHeight" label="Extension height" min="0" max="320"></v-slider>
      </v-flex>
    </v-layout>

    <v-toolbar
      :extended="extended"
      :prominent="prominent"
      :dense="dense"
      :collapse="collapse"
      :flat="flat"
      :src="bg ? 'https://cdn.vuetifyjs.com/images/backgrounds/vbanner.jpg' : undefined"
      :extension-height="extensionHeight"
    >
      <template v-if="extendedSlot" #extension>
        <v-toolbar-items>
          <v-btn text>Link 1</v-btn>
          <v-btn text>Link 2</v-btn>
          <v-btn text>Link 3</v-btn>
        </v-toolbar-items>
      </template>

      <v-toolbar-title>Title</v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items>
        <v-btn text>Link 1</v-btn>
        <v-btn text>Link 2</v-btn>
        <v-btn text>Link 3</v-btn>
      </v-toolbar-items>

      <template v-if="$vuetify.breakpoint.smAndUp">
        <v-btn icon>
          <v-icon>mdi-export-variant</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-delete-circle</v-icon>
        </v-btn>
        <v-btn icon>
          <v-icon>mdi-plus-circle</v-icon>
        </v-btn>
      </template>
    </v-toolbar>
  </div>
</template>

<script>
  export default {
    data: () => ({
      extended: false,
      extendedSlot: false,
      prominent: false,
      dense: false,
      collapse: false,
      flat: false,
      bg: false,
      extensionHeight: 48,
    }),
  }
</script>
